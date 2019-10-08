import {render, unrender, Position} from "../utils";
import BaseComponent from "../base-component";
import EventItem from "../components/event-item";
import EventEditForm from "../components/event-edit-form";
import {dataProvider} from "../services/data-provider";
import {eventEmmiter} from "../services/event-emmiter";
import PointModel from "../models/point";

const DEBOUNCE_TIMEOUT = 1000;

export default class PointController extends BaseComponent {
  constructor(params) {
    super(params);
    this._isInEditMode = params.isInEditMode || false;
    this._element = null;

    this._callbacks.onDismiss = this._callbacks.onDismiss || (() => {});

    if (this._isInEditMode) {
      eventEmmiter.on(`eventEditFormOpened`, (id) => {
        if (this._data.id !== id) {
          this.dismiss();
        }
      });
    }
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    const component = this._isInEditMode ? this._createForm() : this._createItem();
    this._element = component.element;

    return this._element;
  }

  dismiss() {
    if (this._isInEditMode) {
      this._eventEditForm.dismiss();
    }
  }

  _createForm() {
    const eventEditForm = new EventEditForm({
      data: this._data,
      destinations: dataProvider.destinations,
      offers: dataProvider.offers,
    });

    const setErrorState = (e) => {
      try {
        const errors = JSON.parse(e.message).errors;
        const field2Element = {
          [`base_price`]: `event-price`,
          [`destination`]: `event-destination`,
        };
        eventEditForm.setErrorState(errors.map((it) => field2Element[it.fieldName]));
      }
      catch {
        eventEditForm.setErrorState([]);
      }
    };

    eventEditForm.onSubmit((formData) => {
      const entry = this._convertFormDataToPoint(formData);
      const methodName = entry.id === null ? `addPoint` : `editPoint`;
      eventEditForm.setSavingState();
      dataProvider[methodName](entry)
        .then(() => {
          eventEditForm.resetState();
          this.dismiss();
        })
        .catch((e) => {
          setErrorState(e);
        });
    });

    eventEditForm.onFavorite((formData, checkbox) => {
      const entry = this._convertFormDataToPoint(formData);
      eventEditForm.setSavingState();
      checkbox.checked = !checkbox.checked;
      dataProvider.editPoint(entry, false)
        .then(() => {
          this._data = entry;
          setTimeout(() => {
            checkbox.checked = !checkbox.checked;
            eventEditForm.resetState();
          }, DEBOUNCE_TIMEOUT);
        }).catch((e) => {
          setErrorState(e);
        });
    });

    eventEditForm.onDelete(() => {
      eventEditForm.setDeletingState();
      dataProvider.removePoint(this._data.id).catch(() => {
        eventEditForm.setErrorState([]);
      });
    });

    eventEditForm.onDismiss(() => {
      this._setNormalMode();
      this._callbacks.onDismiss();
    });

    this._eventEditForm = eventEditForm;
    return eventEditForm;
  }

  _convertFormDataToPoint(formData) {
    const name = formData.get(`event-destination`);
    const destination = dataProvider.destinations.find((it) => it.name === name);
    const eventType = formData.get(`event-type`);
    const offersForType = dataProvider.offers.find((it) => it.type === formData.get(`event-type`)).offers;

    const acceptedOffers = formData.getAll(`event-offer`);
    const offers = offersForType.map(({title, price}) => ({title, price, accepted: acceptedOffers.includes(title)}));
    const entry = new PointModel({
      id: this._data.id,
      destination,
      offers,
      startTime: new Date(formData.get(`event-start-time`)),
      endTime: new Date(formData.get(`event-end-time`)),
      price: parseInt(formData.get(`event-price`), 10),
      isFavorite: !!formData.get(`event-favorite`),
      type: eventType,
    });
    return entry;
  }

  _createItem() {
    const eventItem = new EventItem({data: this._data});
    eventItem.rollupBtn.addEventListener(`click`, () => {
      this._setEditMode();
    });
    this._eventItem = eventItem;
    return eventItem;
  }

  _setEditMode() {
    if (this._isInEditMode) {
      return;
    }
    this._isInEditMode = true;
    this.removeElement();
    render(this._eventItem.element, this, Position.AFTER_END);
    unrender(this._eventItem);

    eventEmmiter.emit(`eventEditFormOpened`, this._data.id);
    eventEmmiter.on(`eventEditFormOpened`, (id) => {
      if (this._data.id !== id) {
        this.dismiss();
      }
    });
  }

  _setNormalMode() {
    if (!this._isInEditMode) {
      return;
    }
    this._isInEditMode = false;
    this.removeElement();
    if (this._data.id) {
      render(this._eventEditForm.element, this, Position.AFTER_END);
    }
    unrender(this._eventEditForm);
  }
}
