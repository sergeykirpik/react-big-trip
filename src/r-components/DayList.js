import React from 'react';

export default class DayList extends React.Component {
  render() {
    return (
      <ul className="trip-days">
        {this.props.children}
      </ul>
    );
  }
}
