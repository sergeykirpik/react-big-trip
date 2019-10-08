import BaseComponent from "../base-component";

export default class DayListHeader extends BaseComponent {
  constructor(params) {
    super(params);
    const {onSort} = this._callbacks;
    this.element.addEventListener(`click`, (evt) => {
      const sortType = evt.target.dataset.sortType;
      if (sortType) {
        onSort(sortType);
      }
    });
  }

  _nonsortable(title) {
    return `
    <span class="trip-sort__item  trip-sort__item--day">${title}</span>
    `.trim();
  }

  _sortItem(title) {
    const {current} = this._data;
    return `
    <div class="trip-sort__item  trip-sort__item--${title}">
      <input data-sort-type="${title}" id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${title === current ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${title}">${title}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>`.trim();
  }

  get template() {
    const {columns} = this._data;
    return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${columns.map(({title, sortable}) => sortable ? this._sortItem(title) : this._nonsortable(title)).join(``)}
    </form>`.trim();
  }
}
