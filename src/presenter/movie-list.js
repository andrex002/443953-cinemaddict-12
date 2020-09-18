import {SortType, UpdateType, UserAction} from "../const.js";
import ContentSectionView from "../view/content-section.js";
import NoFilmsView from "../view/no-films.js";
import FilmPresenter from "./film.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import FilmsListExtraSectionView from "../view/extra-section.js";
import SortView from "../view/sort.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {compareYear, compareRating} from "../utils/films.js";
import {filter} from "../utils/filter.js";

const NUMBER_FILMS_PER_STEP = 5;
const NUMBER_FILMS_IN_ADDITIONAL_BLOCKS = 2;

export default class MovieList {
  constructor(movieListContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._movieListContainer = movieListContainer;

    this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmPresenterTopRated = {};
    this._filmPresenterMostCommented = {};

    this._sortingComponent = null;
    this._loadMoreButtonComponent = null;

    this._contentSectionComponent = new ContentSectionView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsListExtraTopRatedComponent = new FilmsListExtraSectionView(`Top rated`);
    this._filmsListExtraMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    // this._handleCardChange = this._handleCardChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._filmsListElement = this._contentSectionComponent.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._filmsListElement.querySelector(`.films-list__container`);
    // this._films = null;
    // this._currentFilmsArray = null;
  }

  init() {
    // render(this._movieListContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    // this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    
    // render(this._movieListContainer, this._contentSectionComponent, RenderPosition.BEFOREEND);

    // if (!this._filmsModel.getFilms().length) {
    //   this._renderNoFilms();
    //   return;
    // }

    // this._films = films.slice();
    // this._currentFilmsArray = films.slice();

    this._renderMainContent();
    this._renderExtraCards();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    console.log(filterType)
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(compareYear);
      case SortType.RATING:
        return filtredFilms.sort(compareRating);
    }

    return filtredFilms;
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.resetView());
  }

  _initUpdatedFilm(updatedFilm, presenter) {
    if (presenter[updatedFilm.id]) {
      presenter[updatedFilm.id].init(updatedFilm);
    }
  }

  // _handleCardChange(updatedFilm) {
  //   // this._currentFilmsArray = updateItem(this._currentFilmsArray, updatedFilm);
  //   // this._films = updateItem(this._films, updatedFilm);

  //   this._initUpdatedFilm(updatedFilm, this._filmPresenter);
  //   this._initUpdatedFilm(updatedFilm, this._filmPresenterMostCommented);
  //   this._initUpdatedFilm(updatedFilm, this._filmPresenterTopRated);
  // }
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        
        break;
      case UserAction.DELETE_COMMENT:
        
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.Minor:
        this._clearMainContent();
        this._renderMainContent();
        break;
      case UpdateType.Major:
        this._clearMainContent({resetRenderedFilmCount: true, resetSortType: true});
        this._renderMainContent();
        break;  
    }
  }

  // _applySorting(sortType) {
  //   switch (sortType) {
  //     case SortType.DATE:
  //       this._currentFilmsArray.sort(compareYear);
  //       break;
  //     case SortType.RATING:
  //       this._currentFilmsArray.sort(compareRating);
  //       break;
  //     default:
  //       this._currentFilmsArray = this._films.slice();
  //   }

  //   this._currentSortType = sortType;
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    // this._clearFilmList();
    // this._clearTopRatedFilmList();
    // this._clearMostCommentedFilmList();
    // this._applySorting(sortType);
    // this._filmsListContainer.innerHTML = ``;
    // remove(this._filmsListExtraTopRatedComponent);
    // remove(this._filmsListExtraMostCommentedComponent);
    this._clearMainContent({resetRenderedFilmCount: true});
    this._renderMainContent();
  }

  _renderSort() {
    if(this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieListContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  // Обработчик клика кнопки 'load-more'
  _handleShowMoreButtonClick() {
    // this._renderCards(this._renderedFilmCount, this._renderedFilmCount + NUMBER_FILMS_PER_STEP, this._currentFilmsArray, this._filmsListContainer, this._filmPresenter);
    // this._renderedFilmCount += NUMBER_FILMS_PER_STEP;

    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + NUMBER_FILMS_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderCards(films, this._filmsListContainer, this._filmPresenter);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  // Рендерит кнопку 'load-more' с обработчиком клика
  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  // Рендерит сообщение когда нет фильмов
  _renderNoFilms() {
    render(this._filmsListElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  // Рендерит карточку фильма
  _renderCard(film, place, presentersStore) {
    // const filmPresenter = new FilmPresenter(place, this._handleCardChange, this._handleModeChange);
    const filmPresenter = new FilmPresenter(place, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    presentersStore[film.id] = filmPresenter;
  }

  // Рендерит карточки фильмов
  // _renderCards(from, to, currentFilmsArray, place, presentersStore) {
  //   currentFilmsArray.slice(from, to).forEach((film) => this._renderCard(film, place, presentersStore));
  // }
  _renderCards(films, place, presentersStore) {
    films.forEach((film) => this._renderCard(film, place, presentersStore));
  }

  // _clearFilmList() {
  //   Object
  //     .values(this._filmPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._filmPresenter = {};
  //   this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
  // }

  // _clearTopRatedFilmList() {
  //   Object
  //     .values(this._filmPresenterTopRated)
  //     .forEach((presenter) => presenter.destroy());
  //   this._filmPresenterTopRated = {};
  // }

  // _clearMostCommentedFilmList() {
  //   Object
  //     .values(this._filmPresenterMostCommented)
  //     .forEach((presenter) => presenter.destroy());
  //   this._filmPresenterMostCommented = {};
  // }

  _clearMainContent({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};

    remove(this._sortingComponent);
    remove(this._noFilmsComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  // Рендерит карточки фильмов в экстра-блоки
  _renderExtraCards() {
    // Отрисуем карточки с фильмами в блок "Top rated"
    let filmsRating = this._getFilms().slice();

    render(this._contentSectionComponent, this._filmsListExtraTopRatedComponent, RenderPosition.BEFOREEND);

    const extraTopRatedFilmListContainerElement = this._filmsListExtraTopRatedComponent.getElement().querySelector(`.films-list__container`);
    filmsRating = filmsRating.sort((a, b) => b.rating - a.rating);
    this._renderCards(filmsRating.slice(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS), extraTopRatedFilmListContainerElement, this._filmPresenterTopRated);

    // Отрисуем карточки с фильмами в блок "Most commented"
    let filmsComment = this._getFilms().slice();

    render(this._contentSectionComponent, this._filmsListExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    const extraMostCommentedFilmListContainerElement = this._filmsListExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    filmsComment = filmsComment.sort((a, b) => b.comments.length - a.comments.length);
    this._renderCards(filmsComment.slice(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS), extraMostCommentedFilmListContainerElement, this._filmPresenterMostCommented);
  }

  // Рендерит Главный контент (карточки фильмов и блоки-экстра)
  _renderMainContent() {
    const filmCount = this._getFilms().length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    
    this._renderSort();

    render(this._movieListContainer, this._contentSectionComponent, RenderPosition.BEFOREEND);

    const films = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmCount));

    this._renderCards(films, this._filmsListContainer, this._filmPresenter);

    if (filmCount > this._renderedFilmCount) {
      this._renderLoadMoreButton();
    }
  }
}
