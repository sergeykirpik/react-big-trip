import moment from 'moment';
import React from 'react';

export default class DayItem extends React.Component {
  render() {
    const {dayCounter, dayDate} = this.props;
    return (
      <li className="trip-days__item  day">
        <div className="day__info">
          {dayCounter &&
            <div>
              <span className="day__counter">{dayCounter}</span>
              <time className="day__date" dateTime={dayDate}>{moment(dayDate).format(`MMM D`)}</time>
            </div>
          }
        </div>
        {this.props.children}
      </li>
    );
  }
}
