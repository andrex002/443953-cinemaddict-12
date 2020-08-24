import {createElement} from "../utils.js";

const createSiteMenuTemplate = (films) => {
  const watchlistAmount = films ? films.reduce((result, item) => result + +item.isWatchlist, 0) : 0;
  const historyAmount = films ? films.reduce((result, item) => result + +item.isWatched, 0) : 0;
  const favoritesAmount = films ? films.reduce((result, item) => result + +item.isFavorite, 0) : 0;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistAmount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyAmount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesAmount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu {
  constructor(films) {
    this.films = films;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this.films);
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
