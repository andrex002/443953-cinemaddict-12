import {render, RenderPosition, remove, replace} from "../utils/render.js";
import MovieCardView from "../view/movie-card.js";
import DetailedInformationView from "../view/detailed-information.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  SHOW: `SHOW`
};

export default class Film {
  constructor(listContainerComponent, changeData, changeMode) {
    this._listContainerComponent = listContainerComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCrossClick = this._handleCrossClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleEmojiClick = this._handleEmojiClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new MovieCardView(film);
    this._filmCardComponent.setHandler(this._handleCardClick);

    this._filmDetailsComponent = new DetailedInformationView(film);
    this._filmDetailsComponent.setCloseBtnHandler(this._handleCrossClick);

    this._filmCardComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);

    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setEmojiClickHandler(this._handleEmojiClick);

    if (prevFilmCardComponent === null) {
      render(this._listContainerComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevFilmCardComponent) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (prevFilmDetailsComponent) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }
    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmDetailsComponent);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._film, {isFavorite: !this._film.isFavorite}));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._film, {isWatched: !this._film.isWatched}));
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._film, {isWatchlist: !this._film.isWatchlist}));
  }

  _handleCardClick() {
    this._showCardDetails();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removeCardDetails();
    }
  }

  _removeCardDetails() {
    remove(this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCrossClick() {
    this._removeCardDetails();
  }

  _handleEmojiClick() {

  }

  _showCardDetails() {
    this._changeMode();
    this._filmDetailsComponent.updateElement();
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._mode = Mode.SHOW;
  }
}
