import {createElement} from "../utils.js";

const createStatisticsTemplate = (films) => {
  const filmsAmount = films ? films.length : 0;

  return (
    `<p>${filmsAmount} movies inside</p>`
  );
};

export default class Statistics {
  constructor(films) {
    this.films = films;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this.films);
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
