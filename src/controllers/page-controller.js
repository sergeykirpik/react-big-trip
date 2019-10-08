import {render, unrender} from "../utils";
import {dataProvider, FilterType} from "../services/data-provider";
import {eventEmmiter} from "../services/event-emmiter";

import TripInfo from "../components/trip-info";
import NewEventButton from "../components/new-event-btn";
import TripControls from "../components/trip-controls";
import Menu from "../components/menu";
import Filter from "../components/filter";

import StatsController from "./stats-controller";
import TripController from "./trip-controller";

export default class PageController {
  constructor({tripHeaderContainer, tripBodyContainer}) {

    this._header = tripHeaderContainer;
    this._body = tripBodyContainer;

    this._newEventBtn = new NewEventButton({callbacks: {onClick: this._addNewPoint.bind(this)}});

    this._tripController = new TripController();

    this._pages = {
      table: this._tripController,
      stats: new StatsController(),
    };
    this._activePage = `table`;
    this._currentFilter = `everything`;
  }

  init() {
    dataProvider.addOnDataChangedCallback(() => {
      this._showPage(this._activePage);
    });
    Object.values(this._pages).forEach((page) => {
      render(this._body, page);
      page.hide();
    });
    this._showPage(this._activePage);
  }

  _addNewPoint() {
    this._newEventBtn.element.disabled = true;
    this._tripController.addNewPoint();
    eventEmmiter.on(`newItemFormClosed`, () => {
      this._newEventBtn.element.disabled = false;
    });
  }

  _applyFilter(filter) {
    this._currentFilter = filter;
    this._tripController.applyFilter(filter);
  }

  _renderHeader() {
    unrender(this._tripInfo, false);
    unrender(this._tripControls, false);
    unrender(this._newEventBtn, false);

    this._filter = new Filter({
      data: {filterItems: Object.keys(FilterType), currentFilter: this._currentFilter},
      callbacks: {onFilter: (filter) => this._applyFilter(filter)}
    });

    this._tripControls = new TripControls({
      children: [
        new Menu({
          data: {menuItems: Object.keys(this._pages), activeItem: this._activePage},
          callbacks: {onAction: (action) => this._showPage(action)}
        }),
        this._filter,
      ]
    });

    this._tripInfo = new TripInfo({data: dataProvider.route});

    render(this._header, this._tripInfo);
    render(this._header, this._tripControls);
    render(this._header, this._newEventBtn);
  }

  _showPage(name) {
    this._activePage = name;
    Object.values(this._pages).forEach((page) => page.hide());
    this._pages[name].show();
    this._renderHeader();

    this._filter.setVisibility(this._activePage === `table`);
  }

}
