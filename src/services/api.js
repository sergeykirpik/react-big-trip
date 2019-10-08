import PointModel from "../models/point";

const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip`;
const API_KEY = `e1448a27-e086-4c77-89d2-f591f665f4a7` + 1999; // Math.random(1000);

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.text().then((e) => {
    throw new Error(e);
  });
};

const del = (resourse) => {
  const headers = new Headers({Authorization: `Basic ${API_KEY}`});
  return fetch(`${END_POINT}/${resourse}`, {headers, method: `DELETE`})
    .then(checkStatus);
};

const get = (resourse) => {
  const headers = new Headers({Authorization: `Basic ${API_KEY}`});
  return fetch(`${END_POINT}/${resourse}`, {headers})
    .then(checkStatus)
    .then(toJSON);
};

const put = (resource, data) => {
  const headers = new Headers({Authorization: `Basic ${API_KEY}`, [`Content-Type`]: `application/json`});
  return fetch(`${END_POINT}/${resource}`, {headers, body: JSON.stringify(data), method: `PUT`})
    .then(checkStatus)
    .then(toJSON);
};

const post = (resource, data) => {
  const headers = new Headers({Authorization: `Basic ${API_KEY}`, [`Content-Type`]: `application/json`});
  return fetch(`${END_POINT}/${resource}`, {headers, body: JSON.stringify(data), method: `POST`})
    .then(checkStatus)
    .then(toJSON);
};

const toJSON = (response) => response.json();

export default class Api {
  constructor() {
    this.getPoints = () => get(`points`).then((points) => Promise.resolve(PointModel.parsePoints(points)));
    this.getDestinations = () => get(`destinations`);
    this.getOffers = () => get(`offers`);

    this.editPoint = (point) => put(`points/${point.id}`, PointModel.raw(point));
    this.addPoint = (point) => post(`points`, PointModel.raw(point));
    this.removePoint = (id) => del(`points/${id}`);

    this.sync = (points) => post(`points/sync`, points.map((point) => PointModel.raw(point)));
  }
}
