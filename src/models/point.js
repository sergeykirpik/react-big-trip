import moment from "moment";

const labels = {
  taxi: `Taxi to`,
  bus: `Bus to`,
  train: `Train to`,
  ship: `Ship to`,
  transport: `Transport to`,
  drive: `Drive to`,
  flight: `Flight to`,
  [`check-in`]: `Check-in in`,
  sightseeing: `Sightseeing in`,
  restaurant: `Restaurant in`,
};

export default class PointModel {
  constructor({id, startTime, endTime, price, isFavorite, offers, type, destination}) {
    this.id = id || null;
    this.startTime = startTime;
    this.endTime = endTime;
    this.price = price;
    this.isFavorite = isFavorite || false;
    this.offers = offers || [];
    this.type = type;
    this.destination = destination || {name: ``, description: ``, pictures: []};
  }

  get duration() {
    return this.endTime.valueOf() - this.startTime.valueOf();
  }

  get durationAsString() {
    const d = moment.duration(moment(this.endTime).diff(moment(this.startTime)));

    const pad = (n) => n < 9 ? `0${n}` : `${n}`;

    const pDays = pad(d.days()) + `D`;
    const pHours = pad(d.hours()) + `H`;
    const pMinutes = pad(d.minutes()) + `M`;

    if (d.days() > 0) {
      return `${pDays} ${pHours} ${pMinutes}`;
    }

    if (d.hours() > 0) {
      return `${pHours} ${pMinutes}`;
    }

    return `${pMinutes}`;
  }

  get label() {
    return labels[this.type];
  }

  get title() {
    return this.label + ` ` + this.destination.name;
  }

  get total() {
    return this._getOffersTotal() + this.price;
  }

  static getLabel(pointType) {
    return labels[pointType];
  }

  static parsePoint(data) {
    return new PointModel({
      id: data[`id`],
      type: data[`type`],
      price: data[`base_price`],
      startTime: new Date(data[`date_from`]),
      endTime: new Date(data[`date_to`]),
      isFavorite: data[`is_favorite`],
      destination: data[`destination`],
      offers: data[`offers`],
    });
  }

  static parsePoints(data = []) {
    return data.map((it) => PointModel.parsePoint(it));
  }

  static raw(point) {
    return ({
      id: point.id,
      type: point.type,
      [`base_price`]: point.price,
      [`date_from`]: point.startTime.valueOf(),
      [`date_to`]: point.endTime.valueOf(),
      [`is_favorite`]: point.isFavorite,
      destination: point.destination,
      offers: point.offers,
    });
  }

  _getOffersTotal() {
    return this.offers.filter((it) => it.accepted).reduce((acc, it) => acc + it.price, 0);
  }
}
