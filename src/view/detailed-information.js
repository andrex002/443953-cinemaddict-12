import DetailedCommentView from "./detailed-information-comment.js";
import SmartView from "./smart.js";
import {formatDurationInMinutes, formatDateOfRelease} from "../utils/films.js";

// Создает блок с жанрами
const createGenresTemplate = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(` `);
};

// Создает список с актерами
const createActorsList = (actors) => actors.join(`, `);

// Создает список со сценаристами
const createWritersList = (writers) => writers.join(`, `);

export const createDetailedInformationTemplate = (film, comments) => {
  const {
    poster,
    title,
    rating,
    originalTitle,
    producer,
    screenwriters,
    actors,
    dateOfRelease,
    duration,
    country,
    genres,
    description,
    ageRating,
    isWatchlist,
    isWatched,
    isFavorite
  } = film;

  const watchlistChecked = isWatchlist ? `checked` : ``;
  const watchedChecked = isWatched ? `checked` : ``;
  const favoriteChecked = isFavorite ? `checked` : ``;
  const genresTemplate = createGenresTemplate(genres);
  const actorsList = createActorsList(actors);

  const writersList = createWritersList(screenwriters);

  // const filmDetailsComments =
  //   comments
  //   .map((comment) => {
  //     const detailedCommentComponent = new DetailedCommentView(comment);
  //     return detailedCommentComponent.getTemplate();
  //   })
  //   .join(``);
  const commentsCount = film.comments.length;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${producer}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDateOfRelease(dateOfRelease)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatDurationInMinutes(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresTemplate}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistChecked}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedChecked}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteChecked}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              
            </ul>

            
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmCardDetails extends SmartView {
  constructor(data, comments) {
    super();
    this._data = data;
    this._comments = comments;

    this._commentText = ``;
    this._emoji = ``;

    this._clickHandler = this._clickHandler.bind(this);
    this._clickEmojiHandler = this._clickEmojiHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getEmoji() {
    return this._emoji;
  }

  getTemplate() {
    return createDetailedInformationTemplate(this._data, this._comments);
  }

  setFavoriteCardClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedCardClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistCardClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setEmojiClickHandler(callback) {
    this._callback.emojiClick = callback;

    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((emoji) => {
      emoji.addEventListener(`click`, this._clickEmojiHandler);
    });
  }

  setCloseBtnHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  restoreHandlers() {
    this.setEmojiClickHandler(this._callback.emojiClick);
    this.setCloseBtnHandler(this._callback.click);
    this.setFavoriteCardClickHandler(this._callback.favoriteClick);
    this.setWatchedCardClickHandler(this._callback.watchedClick);
    this.setWatchlistCardClickHandler(this._callback.watchlistClick);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _addsEmoji(evt) {
    const addEmojiLabel = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const addEmojiImage = `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}"></img>`;
    addEmojiLabel.innerHTML = addEmojiImage;
  }

  _clickEmojiHandler(evt) {
    evt.preventDefault();
    this._callback.emojiClick();

    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((emojiItem) => {
      if (evt.target.value !== emojiItem.value) {
        emojiItem.removeAttribute(`checked`);
      } else {
        emojiItem.setAttribute(`checked`, ``);
      }
    });

    this._addsEmoji(evt);
    this._emoji = evt.target.value;
  }
}
