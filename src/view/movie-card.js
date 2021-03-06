import SmartView from "./smart.js";
import {formatDurationInMinutes} from "../utils/films.js";

const createMovieCardTemplate = (film) => {
  const {
    title,
    rating,
    yearOfProduction,
    duration,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite
  } = film;

  const genre = genres[0];
  const commentsCount = comments.length;
  const watchlistClassName = isWatchlist ? `film-card__controls-item--active` : ``;
  const watchedClassName = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteClassName = isFavorite ? `film-card__controls-item--active` : ``;

  //  ограничим длину описания
  const filmCardDescription = description.length > 140 ? description.slice(0, 140) + `...` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${yearOfProduction}</span>
        <span class="film-card__duration">${formatDurationInMinutes(duration)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmCardDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class MovieCard extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._film);
  }

  setFavoriteCardClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedCardClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistCardClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  restoreHandlers() {
    this.setFavoriteCardClickHandler(this._callback.favoriteClick);
    this.setWatchedCardClickHandler(this._callback.watchedClick);
    this.setWatchlistCardClickHandler(this._callback.watchlistClick);

    this.setHandler(this._callback.click);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.favoriteClick();
    this.updateData({isFavorite: !this._film.isFavorite}, true);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.watchedClick();
    this.updateData({isWatched: !this._film.isWatched}, true);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.watchlistClick();
    this.updateData({isWatchlist: !this._film.isWatchlist}, true);
  }
}
