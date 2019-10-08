import {groupBy} from '../utils';
import moment from 'moment';
import React from 'react';
import DayListHeader from './DayListHeader';
import GroupedDayList from './GroupedDayList';
import { SortType, FilterType, dataProvider } from '../services/data-provider';

const columns = [];

columns.push({title: `day`, sortable: false});

Object.keys(SortType).forEach((key) => {
  columns.push({title: key, sortable: true});
});

columns.push({title: `offers`, sortable: false});

export default class TripEvents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 'everything',
      currentSort: 'event',
    }
  }

  get _filteredPoints() {
    return FilterType[this.state.currentFilter](dataProvider.points);
  }

  get _pointsByDay() {
    const sorted = this._filteredPoints.sort((p1, p2) => p1.startTime.valueOf() - p2.startTime.valueOf());
    return groupBy(sorted, (a, b) =>
      moment(a.startTime).format(`YYYY-MM-DD`) === moment(b.startTime).format(`YYYY-MM-DD`));
  }

  get _sortedPoints() {
    return SortType[this.state.currentSort](this._filteredPoints);
  }

  render() {
    return (
      <section className="trip-events">
        <h2 className="visually-hidden">Trip events</h2>
        {/* <NoPoints /> */}
        {/* <!-- or --> */}
        <DayListHeader columns={columns} current="event"/>
        <GroupedDayList pointsByDay={this._pointsByDay} 
        />
        {/* <!-- DayList --> */}
      </section>
    );
  }
}