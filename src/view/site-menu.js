import AbstractView from "./abstract.js";
import { PageMode } from "../const.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<a href="#${name}" id="${type}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${name} ${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

export const createSiteMenuTemplate = (filterItems, currentFilterType, pageMode) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${pageMode === PageMode.STATISTICS ? `main-navigation__additional--active` : ``}">Stats</a>
    </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType, pageMode) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._pageMode = pageMode;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticsClickHandler = this._statisticsClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter, this._pageMode);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    let id;

    if (evt.target.classList.contains(`main-navigation__item-count`)) {
      id = evt.target.parentElement.id;
    } else {
      id = evt.target.id;
    }
    this._callback.filterTypeChange(id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    const filterLinks = this.getElement().querySelectorAll(`.main-navigation__item`);
    filterLinks.forEach((filterLink) => {
      filterLink.addEventListener(`click`, this._filterTypeChangeHandler);
    });
  }

  _statisticsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statisticsClick();
  }

  setStatisticsClickHandler(callback) {
    this._callback.statisticsClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._statisticsClickHandler);
  }
}
