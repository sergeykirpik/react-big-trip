import React from 'react';

export default class DayListHeader extends React.Component {
  handleClick(evt) {
    const sortType = evt.target.dataset.sortType;
    if (sortType) {
      this.props.onSort(sortType);
    }
  }

  _nonsortable(title) {
    return (
      <span key={title} className="trip-sort__item  trip-sort__item--day">{title}</span>
    );
  }

  _sortItem(title) {
    const {current} = this.props;
    return (
      <div className={`trip-sort__item  trip-sort__item--${title}`} key={title}>
        <input 
          data-sort-type={title} 
          id={`sort-${title}`} 
          className="trip-sort__input  visually-hidden" 
          type="radio" name="trip-sort" value={`sort-${title}`} 
          checked={title === current} onChange={() => {}}/>
        <label className="trip-sort__btn" htmlFor={`sort-${title}`}>{title}
          <svg className="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>
    );
  }

  render() {
    const {columns} = this.props;
    return (
      <form className="trip-events__trip-sort  trip-sort" action="#" method="get" 
        onClick={this.handleClick.bind(this)}>
        {columns.map(({title, sortable}) => 
          sortable ? this._sortItem(title) : this._nonsortable(title)
        )}
      </form>
    );
  }
}
