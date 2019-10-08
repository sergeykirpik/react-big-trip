import moment from "moment";
import React from 'react';

const getDateTime = (date) => moment(date).format();
const getTime = (date) => moment(date).format(`HH:mm`);

export default class EventItem extends React.Component {

  get rollupBtn() {
    return this.element.querySelector(`.event__rollup-btn`);
  }

  render() {
    const {type, startTime, endTime, title, price, durationAsString} = this.props.point;
    const offers = this.props.point.offers.filter((it) => it.accepted).slice(0, 3);
    return (
    <div className="event">
      <div className="event__type">
        <img className="event__type-icon" width="42" height="42" src={`img/icons/${type}.png`} alt="Event type icon" />
      </div>
      <h3 className="event__title">{title}</h3>

      <div className="event__schedule">
        <p className="event__time">
          <time className="event__start-time" dateTime={getDateTime(startTime)}>
            {getTime(startTime)}</time>
          &mdash;
          <time className="event__end-time" dateTime={getDateTime(endTime)}>
            {getTime(endTime)}</time>
        </p>
        <p className="event__duration">{durationAsString}</p>
      </div>

      <p className="event__price">
        &euro;{' '}<span className="event__price-value">{price}</span>
      </p>

      <h4 className="visually-hidden">Offers:</h4>
      <ul className="event__selected-offers">
        {offers.map((it) => 
          <li className="event__offer" key={it.title}>
            <span className="event__offer-title">{it.title}</span>
            +
            &euro;{' '}<span className="event__offer-price">{it.price}</span>
          </li>
        )}
      </ul>

      <button className="event__rollup-btn" type="button">
        <span className="visually-hidden">Open event</span>
      </button>
    </div>
  );
  }
}
