import AbstractView from "./abstract.js";

const createExtraSectionTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtraSection extends AbstractView {
  constructor(title) {
    super();
    this.title = title;
  }

  getTemplate() {
    return createExtraSectionTemplate(this.title);
  }
}
