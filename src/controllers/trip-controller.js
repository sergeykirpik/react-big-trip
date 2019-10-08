import {groupBy, rerender} from "../utils";
import BaseComponent from "../base-component";
import DayList from "../components/day-list";
import NoPoints from "../components/no-points";
import moment from "moment";
import {dataProvider, FilterType, SortType} from "../services/data-provider";
import {eventEmmiter} from "../services/event-emmiter";
import DayListHeader from "../components/day-list-header";
import DayItem from "../components/day-item";
import TripEventsSection from "../components/trip-events-sec";

import EventListController from "./event-list-controller";
import PointController from "./point-controller";
import PointModel from "../models/point";

const columns = [];

columns.push({title: `day`, sortable: false});

Object.keys(SortType).forEach((key) => {
  columns.push({title: key, sortable: true});
});

columns.push({title: `offers`, sortable: false});

export default class TripController extends BaseComponent {
  constructor() {
    super();
    this._data = dataProvider.points;
    this._sort = null;
    this._noPoints = new NoPoints();
    this._currentSort = `event`;
    this._currentFilter = `everything`;
    this._isInAddingMode = false;
    this._editForm = null;

    dataProvider.addOnDataChangedCallback(() => {
      this._data = dataProvider.points;
      this._rerender();
    });
  }

  _rerender() {
    eventEmmiter.emit(`cleanUp`);
    rerender(this);
  }

  get _filteredPoints() {
    return FilterType[this._currentFilter](this._data);
  }

  get _pointsByDay() {
    const sorted = this._filteredPoints.sort((p1, p2) => p1.startTime.valueOf() - p2.startTime.valueOf());
    return groupBy(sorted, (a, b) =>
      moment(a.startTime).format(`YYYY-MM-DD`) === moment(b.startTime).format(`YYYY-MM-DD`));
  }

  get _sortedPoints() {
    return SortType[this._currentSort](this._filteredPoints);
  }

  get _visibleColumns() {
    return this._currentSort === `event` ? columns
      : columns.map((it) => it.title === `day` ? Object.assign({}, it, {title: ``}) : it);
  }

  get _groupedDayList() {
    let dayCounter = 1;
    const dayItems = this._pointsByDay.map((it) => new DayItem({
      children: [new EventListController({data: it})],
      data: {
        dayCounter: dayCounter++,
        dayDate: moment(it[0].startTime).format(`YYYY-MM-DD`),
      }
    }));
    return new DayList({children: dayItems});
  }

  get _sortedDayList() {
    const dayItem = new DayItem({
      children: [new EventListController({data: this._sortedPoints})],
    });
    return new DayList({children: [dayItem]});
  }

  get _dayList() {
    return this._currentSort === `event` ? this._groupedDayList : this._sortedDayList;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._noPoints.element.textContent = dataProvider.isLoading ? `Loading...` : `Click New Event to create your first point`;
    let children = [this._editForm ? this._editForm : this._noPoints];
    if (this._sortedPoints.length > 0) {
      this._sort = new DayListHeader({
        data: {
          columns: this._visibleColumns,
          current: this._currentSort,
        },
        callbacks: {
          onSort: this.onSort.bind(this),
        }
      });
      children = [this._sort, this._editForm, this._dayList];
    }
    this._element = new TripEventsSection({children}).element;
    return this._element;
  }

  onSort(method) {
    this._currentSort = method;
    this._rerender();
  }

  addNewPoint() {
    if (this._editForm) {
      return;
    }
    this._editForm = new PointController({
      data: new PointModel({
        type: dataProvider.offers[0].type,
        offers: dataProvider.offers[0].offers.slice(),
        startTime: new Date(),
        endTime: new Date(),
      }),
      callbacks: {
        onDismiss: () => {
          this._editForm = null;
          eventEmmiter.emit(`newItemFormClosed`);
        }
      },
      isInEditMode: true
    });
    eventEmmiter.emit(`eventEditFormOpened`, null);
    this._rerender();
  }

  applyFilter(filter) {
    this._currentFilter = filter;
    this._rerender();
  }
}
