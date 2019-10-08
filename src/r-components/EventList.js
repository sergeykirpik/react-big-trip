import React from 'react';
import EventItem from './EventItem';

export default class EventList extends React.Component {
  render() {
    return (
      <ul className="trip-events__list">
        {/* <!-- EventSlot --> */}
        {this.props.data.map(it => 
          <li className="trip-events__item" key={it.id}>
            <EventItem point={it} />
          </li>
        )}
      </ul>
    );
  }
}
