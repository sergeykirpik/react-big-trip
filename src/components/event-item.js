import moment from "moment";
import BaseComponent from "../base-component.js";

const getDateTime = (date) => moment(date).format();
const getTime = (date) => moment(date).format(`HH:mm`);

export default class EventItem extends BaseComponent {

  get rollupBtn() {
    return this.element.querySelector(`.event__rollup-btn`);
  }

  get template() {
    const {startTime, endTime, type, title, price, durationAsString} = this._data;
    const offers = this._data.offers.filter((it) => it.accepted).slice(0, 3);
    return `
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${title}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateTime(startTime)}">
            ${getTime(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateTime(endTime)}">
            ${getTime(endTime)}</time>
        </p>
        <p class="event__duration">${durationAsString}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map((it) => `<li class="event__offer">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
        </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `.trim();
  }
}
