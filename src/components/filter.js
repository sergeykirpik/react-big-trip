import {capitalize} from '../utils.js';
import BaseComponent from '../base-component.js';

export default class Filter extends BaseComponent {
  constructor(params) {
    super(params);
    this.element.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._callbacks.onFilter(evt.target.value);
      }
    });
  }

  get template() {
    const {filterItems} = this._data;
    return `
    <div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterItems.map((k) => `<div class="trip-filters__filter">
          <input id="filter-${k}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${k}" ${this._checked(k)}>
          <label class="trip-filters__filter-label" for="filter-${k}">${capitalize(k)}</label>
        </div>`).join(``)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`.trim();
  }

  _checked(filter) {
    return (filter === this._data.currentFilter) ? `checked` : ``;
  }

}
