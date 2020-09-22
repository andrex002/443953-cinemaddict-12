import AbstractView from "./abstract.js";
import {PageMode} from "../const.js";

const createFilterItemTemplate = (filter, currentFilterType, pageMode) => {
  const {type, name, count} = filter;

  return `<a href="#${name}" id="${type}" class="main-navigation__item ${type === currentFilterType && pageMode !== PageMode.STATISTICS ? `main-navigation__item--active` : ``}">${name} ${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

export const createSiteMenuTemplate = (filterItems, currentFilterType, pageMode) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType, pageMode)).join(``);

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

    let id = evt.target.classList.contains(`main-navigation__item-count`) ? evt.target.parentElement.id : evt.target.id;

    this._callback.filterTypeChange(id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;

    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((filterLink) => {
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
