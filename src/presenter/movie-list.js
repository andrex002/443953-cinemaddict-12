import {SortType} from "../const.js";
import ContentSectionView from "../view/content-section.js";
import NoFilmsView from "../view/no-films.js";
import FilmPresenter from "./film.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import FilmsListExtraSectionView from "../view/extra-section.js";
import SortView from "../view/sort.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {compareYear, compareRating} from "../utils/films.js";

const NUMBER_FILMS_PER_STEP = 5;
const NUMBER_FILMS_IN_ADDITIONAL_BLOCKS = 2;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmPresenterTopRated = {};
    this._filmPresenterMostCommented = {};

    this._contentSectionComponent = new ContentSectionView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._sortingComponent = new SortView();
    this._filmsListExtraTopRatedComponent = new FilmsListExtraSectionView(`Top rated`);
    this._filmsListExtraMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsListElement = this._contentSectionComponent.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._filmsListElement.querySelector(`.films-list__container`);
    this._films = null;
    this._currentFilmsArray = null;
  }

  init(films) {
    render(this._movieListContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieListContainer, this._contentSectionComponent, RenderPosition.BEFOREEND);
    if (!films.length) {
      this._renderNoFilms();
      return;
    }

    this._films = films.slice();
    this._currentFilmsArray = films.slice();

    this._renderMainContent();
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedFilm) {
    this._currentFilmsArray = updateItem(this._currentFilmsArray, updatedFilm);
    this._films = updateItem(this._films, updatedFilm);
    if (this._filmPresenter[updatedFilm.id]) {
      this._filmPresenter[updatedFilm.id].init(updatedFilm);
    }

    if (this._filmPresenterMostCommented[updatedFilm.id]) {
      this._filmPresenterMostCommented[updatedFilm.id].init(updatedFilm);
    }

    if (this._filmPresenterTopRated[updatedFilm.id]) {
      this._filmPresenterTopRated[updatedFilm.id].init(updatedFilm);
    }
  }

  _applySorting(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._currentFilmsArray.sort(compareYear);
        break;
      case SortType.RATING:
        this._currentFilmsArray.sort(compareRating);
        break;
      default:
        this._currentFilmsArray = this._films.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._clearFilmList();
    this._clearTopRatedFilmList();
    this._clearMostCommentedFilmList();
    this._applySorting(sortType);
    // this._filmsListContainer.innerHTML = ``;
    remove(this._filmsListExtraTopRatedComponent);
    remove(this._filmsListExtraMostCommentedComponent);
    this._renderMainContent();
  }

  // Обработчик клика кнопки 'load-more'
  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedFilmCount, this._renderedFilmCount + NUMBER_FILMS_PER_STEP, this._currentFilmsArray, this._filmsListContainer, this._filmPresenter);
    this._renderedFilmCount += NUMBER_FILMS_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  // Рендерит кнопку 'load-more' с обработчиком клика
  _renderLoadMoreButton() {
    render(this._filmsListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  // Рендерит сообщение когда нет фильмов
  _renderNoFilms() {
    render(this._filmsListElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  // Рендерит карточку фильма
  _renderCard(film, place, presentersStore) {
    const filmPresenter = new FilmPresenter(place, this._handleCardChange, this._handleModeChange);
    filmPresenter.init(film);
    presentersStore[film.id] = filmPresenter;
  }

  // Рендерит карточки фильмов
  _renderCards(from, to, currentFilmsArray, place, presentersStore) {
    currentFilmsArray.slice(from, to).forEach((film) => this._renderCard(film, place, presentersStore));
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
  }

  _clearTopRatedFilmList() {
    Object
      .values(this._filmPresenterTopRated)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenterTopRated = {};
  }

  _clearMostCommentedFilmList() {
    Object
      .values(this._filmPresenterMostCommented)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenterMostCommented = {};
  }

  // Рендерит карточки фильмов в экстра-блоки
  _renderExtraCards() {
    // Отрисуем карточки с фильмами в блок "Top rated"
    let filmsRating = this._currentFilmsArray.slice();

    render(this._contentSectionComponent, this._filmsListExtraTopRatedComponent, RenderPosition.BEFOREEND);

    const extraTopRatedFilmListContainerElement = this._filmsListExtraTopRatedComponent.getElement().querySelector(`.films-list__container`);
    filmsRating = filmsRating.sort((a, b) => b.rating - a.rating);
    this._renderCards(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS, filmsRating, extraTopRatedFilmListContainerElement, this._filmPresenterTopRated);

    // Отрисуем карточки с фильмами в блок "Most commented"
    let filmsComment = this._currentFilmsArray.slice();

    render(this._contentSectionComponent, this._filmsListExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    const extraMostCommentedFilmListContainerElement = this._filmsListExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    filmsComment = filmsComment.sort((a, b) => b.comments.length - a.comments.length);
    this._renderCards(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS, filmsComment, extraMostCommentedFilmListContainerElement, this._filmPresenterMostCommented);
  }

  // Рендерит Главный контент (карточки фильмов и блоки-экстра)
  _renderMainContent() {
    this._renderCards(0, Math.min(this._currentFilmsArray.length, NUMBER_FILMS_PER_STEP), this._currentFilmsArray, this._filmsListContainer, this._filmPresenter);

    if (this._currentFilmsArray.length > NUMBER_FILMS_PER_STEP) {
      this._renderLoadMoreButton();
    }

    this._renderExtraCards();
  }
}
