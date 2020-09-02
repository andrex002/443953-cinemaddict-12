import {SortType} from "../const.js";
import ContentSectionView from "../view/content-section.js";
import NoFilmsView from "../view/no-films.js";
import MovieCardView from "../view/movie-card.js";
import FilmCardDetailsView from "../view/detailed-information.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import FilmsListExtraSectionView from "../view/extra-section.js";
import SortView from "../view/sort.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {compareYear, compareRating} from "../utils/films.js";

const NUMBER_FILMS_PER_STEP = 5;
const NUMBER_FILMS_IN_ADDITIONAL_BLOCKS = 2;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._contentSectionComponent = new ContentSectionView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._sortingComponent = new SortView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._filmsListElement = this._contentSectionComponent.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._filmsListElement.querySelector(`.films-list__container`);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
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

    this._applySorting(sortType);
    this._filmsListContainer.innerHTML = ``;
    this._renderedFilmCount = NUMBER_FILMS_PER_STEP;
    this._renderMainContent();
  }

  // Обработчик клика кнопки 'load-more'
  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedFilmCount, this._renderedFilmCount + NUMBER_FILMS_PER_STEP, this._currentFilmsArray, this._filmsListContainer);
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

  // Рендерит карточку фильма с функционалом показа попапа
  _renderCard(film, listContainerComponent) {
    const filmCardComponent = new MovieCardView(film);

    render(listContainerComponent, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

    filmCardComponent.setHandler(() => {
      this.filmsDetailsComponent = new FilmCardDetailsView(film);

      render(document.body, this.filmsDetailsComponent, RenderPosition.BEFOREEND);

      document.addEventListener(`keydown`, onEscKeyDown);

      this.filmsDetailsComponent.setCloseBtnHandler(() => {
        remove(this.filmsDetailsComponent);
      });
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        remove(this.filmsDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }

  // Рендерит карточки фильмов
  _renderCards(from, to, currentFilmsArray, place) {
    currentFilmsArray.slice(from, to).forEach((film) => this._renderCard(film, place));
  }

  // Рендерит карточки фильмов в экстра-блоки
  _renderExtraCards() {
    // Отрисуем карточки с фильмами в блок "Top rated"
    let filmsRating = this._currentFilmsArray.slice();

    const filmsListExtraTopRatedComponent = new FilmsListExtraSectionView(`Top rated`);
    render(this._contentSectionComponent, filmsListExtraTopRatedComponent, RenderPosition.BEFOREEND);

    const extraTopRatedFilmListContainerElement = filmsListExtraTopRatedComponent.getElement().querySelector(`.films-list__container`);
    filmsRating = filmsRating.sort((a, b) => b.rating - a.rating);
    this._renderCards(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS, filmsRating, extraTopRatedFilmListContainerElement);

    // Отрисуем карточки с фильмами в блок "Most commented"
    let filmsComment = this._currentFilmsArray.slice();

    const filmsListExtraMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);
    render(this._contentSectionComponent, filmsListExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    const extraMostCommentedFilmListContainerElement = filmsListExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    filmsComment = filmsComment.sort((a, b) => b.comments.length - a.comments.length);
    this._renderCards(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS, filmsComment, extraMostCommentedFilmListContainerElement);
  }

  // Рендерит Главный контент (карточки фильмов и блоки-экстра)
  _renderMainContent() {
    this._renderCards(0, Math.min(this._currentFilmsArray.length, NUMBER_FILMS_PER_STEP), this._currentFilmsArray, this._filmsListContainer);

    if (this._currentFilmsArray.length > NUMBER_FILMS_PER_STEP) {
      this._renderLoadMoreButton();
    }

    this._renderExtraCards();
  }
}
