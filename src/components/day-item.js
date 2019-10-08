import moment from "moment";
import BaseComponent from "../base-component.js";

export default class DayItem extends BaseComponent {
  get template() {
    const {dayCounter, dayDate} = this._data;
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        ${!dayCounter ? `` : `
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${dayDate}">${moment(dayDate).format(`MMM D`)}</time>`}
      </div>
      <!-- EventList -->

    </li>`.trim();
  }
}
