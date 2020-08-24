import {createElement} from "../utils.js";

export default class Statistics {
  constructor(filmsAmount) {
    this.filmsAmount = filmsAmount;
    this._element = null;
  }

  getTemplate() {
    return `<p>${this.filmsAmount} movies inside</p>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
