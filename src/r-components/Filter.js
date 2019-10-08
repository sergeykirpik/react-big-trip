import {capitalize} from '../utils.js';
import React from 'react';

export default class Filter extends React.Component {

  handleClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      this.props.onFilter(evt.target.value);
    }
  }

  render() {
    const {filterItems, currentFilter} = this.props;
    return (
      <form className="trip-filters" action="#" method="get" onClick={this.handleClick.bind(this)}>
        {filterItems.map((k) => 
          <div className="trip-filters__filter" key={k}>
            <input 
              id={`filter-${k}`} 
              className="trip-filters__filter-input visually-hidden" 
              type="radio" 
              name="trip-filter" 
              value={k}
              checked={k === currentFilter}
              onChange={() => {}} />

              <label 
                className="trip-filters__filter-label" 
                htmlFor={`filter-${k}`}>
                {capitalize(k)}
              </label>
          </div>
        )}
        <button className="visually-hidden" type="submit">Accept filter</button>
      </form>
    );
  }
}
