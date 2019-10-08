import {createElement, render} from "./utils";

export default class BaseComponent {
  constructor(params) {
    params = params || {};
    this._element = null;
    this._children = (params.children || []).filter((it) => it !== null);
    this._data = params.data || {};
    this._callbacks = params.callbacks || {};
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      this._children.forEach((component) => render(this._element, component));
    }
    return this._element;
  }

  get template() {
    return `<div></div>`;
  }

  hide() {
    this.element.classList.add(`visually-hidden`);
  }

  removeElement() {
    this._element = null;
    this._children.forEach((component) => component.removeElement());
  }

  setVisibility(isVisible) {
    if (isVisible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.element.classList.remove(`visually-hidden`);
    this._afterShow();
  }

  _afterShow() {
    // overriden in accestors
  }

}
