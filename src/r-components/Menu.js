import {capitalize} from '../utils.js';
import React from 'react';

export default class Menu extends React.Component {

  handleClick(evt) {
    if (evt.target.tagName === `A`) {
      this.props.onAction(evt.target.hash.slice(1));
    }
  }

  render() {
    const {menuItems, activeItem} = this.props;
    return (
      <nav 
        className="trip-controls__trip-tabs  trip-tabs" 
        onClick={this.handleClick.bind(this)}>
        {menuItems.map((it) => 
        <a 
          key={it}
          className={'trip-tabs__btn ' + (it === activeItem ? `trip-tabs__btn--active` : ``)} 
          href={`#${it}`}>
          {capitalize(it)}
        </a>)}
      </nav>
    );
  }
}
