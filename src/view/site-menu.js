import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${name} ${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
  
};

export const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);
  // const watchlistAmount = films ? films.reduce((result, item) => result + +item.isWatchlist, 0) : 0;
  // const historyAmount = films ? films.reduce((result, item) => result + +item.isWatched, 0) : 0;
  // const favoritesAmount = films ? films.reduce((result, item) => result + +item.isFavorite, 0) : 0;
  

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
