import React from 'react';

export default class TripInfo extends React.Component {
  render() {
    const {title, dates, cost} = this.props.route;
    return (
      <section className="trip-main__trip-info  trip-info">
        <div className="trip-info__main">
          <h1 className="trip-info__title">{title}</h1>
          <p className="trip-info__dates">{dates}</p>
        </div>
        <p className="trip-info__cost">
          Total: &euro;&nbsp;<span className="trip-info__cost-value">{cost}</span>
        </p>
      </section>
    );
  }
}

