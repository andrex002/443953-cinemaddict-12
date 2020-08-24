import {createElement} from "../utils.js";

const createExtraSectionTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtraSection {
  constructor(title) {
    this.title = title;
    this._element = null;
  }

  getTemplate() {
    return createExtraSectionTemplate(this.title);
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
