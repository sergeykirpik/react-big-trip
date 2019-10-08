import React from 'react';
import Menu from './Menu';
import Filter from './Filter';

export default class TripControls extends React.Component {
  render() {
    const {menuItems, activeItem, filterItems, currentFilter} = this.props;
    return (
      <div className="trip-main__trip-controls  trip-controls">
        <h2 className="visually-hidden">Switch trip view</h2>
        <Menu menuItems={menuItems} activeItem={activeItem} />
        <h2 className="visually-hidden">Filter events</h2>
        <Filter filterItems={filterItems} currentFilter={currentFilter} />
      </div>
    );
  }
}
