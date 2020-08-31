import AbstractView from "./abstract.js";

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
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
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

export default class MovieCard extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this.film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
}
