import {render, RenderPosition, remove, replace} from "../utils/render.js";
import MovieCardView from "../view/movie-card.js";
import DetailedInformationView from "../view/detailed-information.js";
import CommentListPresenter from "./comment-list.js";
import {AUTORIZATION, END_POINT, UserAction, UpdateType, FilterType} from "../const.js";
import Api from '../api';

const Mode = {
  DEFAULT: `DEFAULT`,
  SHOW: `SHOW`
};

export default class Film {
  constructor(listContainerComponent, changeData, changeMode, commentsModel, filterModel) {
    this._listContainerComponent = listContainerComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filterModel = filterModel;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;
    this._api = new Api(END_POINT, AUTORIZATION);

    this._commentsModel = commentsModel;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCrossClick = this._handleCrossClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._commentsModel.set(this._film.comments);
    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new MovieCardView(this._film);
    this._filmCardComponent.setHandler(this._handleCardClick);

    this._filmDetailsComponent = new DetailedInformationView(this._film);
    this._filmDetailsComponent.setCloseBtnHandler(this._handleCrossClick);

    this._filmCardComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);

    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setEmojiClickHandler(this._handleEmojiClick);

    this._initDetailsCard();

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

  _initDetailsCard() {
    this._commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);

    this._commentListPresenter = new CommentListPresenter(this._commentsContainer, this._newCommentContainer, this._film, this._changeData, this._commentsModel, this._api);
    this._api.getComments(this._film.id).then((comments) => this._commentListPresenter.init(comments));
  }

  _handleFavoriteClick() {
    const isMinorUpdate = this._filterModel.get() === FilterType.FAVORITES;
    this._changeData(
        UserAction.UPDATE_FILM,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        Object.assign({}, this._film, {isFavorite: !this._film.isFavorite})
    );
  }

  _handleWatchedClick() {
    const isMinorUpdate = this._filterModel.get() === FilterType.HISTORY;
    this._changeData(
        UserAction.UPDATE_FILM,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        Object.assign({}, this._film, {isWatched: !this._film.isWatched})
    );
  }

  _handleWatchlistClick() {
    const isMinorUpdate = this._filterModel.get() === FilterType.WATCHLIST;
    this._changeData(
        UserAction.UPDATE_FILM,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        Object.assign({}, this._film, {isWatchlist: !this._film.isWatchlist})
    );
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

  _showCardDetails() {
    this._changeMode();
    this._filmDetailsComponent.updateElement();
    this._initDetailsCard();
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.SHOW;
  }
}
