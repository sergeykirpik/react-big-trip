import Api from "./api";
import RouteModel from "../models/route";
import PointModel from "../models/point";
import Store from "./store";

const APPLICATION_STORAGE_KEY = `Big-Trip-Application`;

const apiProxy = new Api();
const storageProxy = new Store(APPLICATION_STORAGE_KEY, window.localStorage);

export const FilterType = {
  everything: (data) => data,
  future: (data) => {
    const currentDate = Date.now();
    return data.filter((it) => it.startTime.valueOf() > currentDate);
  },
  past: (data) => {
    const currentDate = Date.now();
    return data.filter((it) => it.endTime.valueOf() < currentDate);
  },
};

export const SortType = {
  event: (points) => points,
  time: (points) => points.slice()
    .sort((a, b) => b.duration - a.duration),
  price: (points) => points.slice()
    .sort((a, b) => b.price - a.price),
};

class DataProvider {
  constructor() {
    this._destinations = [];
    this._offers = [];
    this._route = new RouteModel();
    this._isLoading = true;

    this._onDataChangedCallbacks = [];
  }
  get destinations() {
    return this._destinations;
  }

  get isLoading() {
    return this._isLoading;
  }

  get isOnline() {
    return window.navigator.onLine;
  }

  get offers() {
    return this._offers;
  }

  get points() {
    return this._route.points;
  }

  get route() {
    return this._route;
  }

  addOnDataChangedCallback(callback) {
    this._onDataChangedCallbacks.push(callback);
  }

  addPoint(point) {
    return this._proxy.addPoint(point).then(() => this.getPoints());
  }

  editPoint(point, autoUpdate = true) {
    const result = this._proxy.editPoint(point);
    if (autoUpdate) {
      return result.then(() => this.getPoints());
    }
    return result;
  }

  getPoints() {
    return this._proxy.getPoints().then((points) => {
      this._route.setPoints(points);
      this._notifyAll([`points`]);
    });
  }

  load() {
    this._isLoading = true;
    return Promise.all([
      this._proxy.getOffers(),
      this._proxy.getDestinations(),
      this._proxy.getPoints(),
    ]).then(([offers, destinations, points]) => {
      this._offers = offers;
      this._destinations = destinations;
      this._route.setPoints(points);
      this._isLoading = false;
      this._notifyAll([`offers`, `destinations`, `points`]);
    });
  }

  removePoint(id) {
    return this._proxy.removePoint(id).then(() => this.getPoints());
  }

  sync() {
    if (this.isOnline) {
      storageProxy.getPoints().then((points) => apiProxy.sync(points));
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  get _proxy() {
    if (this.isOnline) {
      return apiProxy;
    }
    return storageProxy;
  }

  _notifyAll(keys) {
    this._onDataChangedCallbacks.forEach((it) => it(keys));
  }
}

export const dataProvider = new DataProvider();
dataProvider.addOnDataChangedCallback((keys) => {
  if (!dataProvider.isOnline) {
    return;
  }
  keys.forEach((key) => {
    let data = dataProvider[key];
    if (key === `points`) {
      data = data.map((it) => PointModel.raw(it));
    }
    storageProxy.setItem(key, data);
  });
});
