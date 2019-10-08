import moment from "moment";

export default class RouteModel {
  constructor(points) {
    this._points = points || [];
  }

  get cost() {
    return this._points.reduce((acc, it) => acc + it.total, 0);
  }

  get dates() {
    if (this._points.length === 0) {
      return ``;
    }
    return [
      moment(this._points[0].startTime).format(`MMM D`),
      moment(this._points[this._points.length - 1].endTime).format(`MMM D`),
    ].join(` &mdash; `);
  }

  get points() {
    return this._points;
  }

  get title() {
    if (this._points.length === 0) {
      return ``;
    }
    if (this._points.length > 3) {
      return [
        this._points[0].destination.name,
        this._points[this._points.length - 1].destination.name
      ].join(` &mdash; ... &mdash; `);
    }
    return this._points.map((it) => it.destination.name).join(` &mdash; `);
  }

  setPoints(points) {
    this._points = points;
  }
}

