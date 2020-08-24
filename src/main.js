import {render, RenderPosition} from "./utils.js";
import {generateMovieCard} from "./mock/movie-card.js";

import TitleUserView from "./view/title-user.js";
import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import ContentSectionView from "./view/content-section.js";
import MovieCardView from "./view/movie-card.js";
import NoFilmsView from "./view/no-films.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import FilmsListExtraSectionView from "./view/extra-section.js";
import StatisticsView from "./view/statistics.js";
import FilmCardDetailsView from "./view/detailed-information.js";

const NUMBER_FILMS = 22;
const NUMBER_FILMS_PER_STEP = 5;
const NUMBER_FILMS_IN_ADDITIONAL_BLOCKS = 2;

// Получим массив с фильмами
const films = new Array(NUMBER_FILMS).fill(``).map(generateMovieCard);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Рендерит карточку фильма с настройками
const renderCardFilm = (place, film, position) => {
  const movieCardComponent = new MovieCardView(film);
  const filmCardDetails = new FilmCardDetailsView(film);

  const titleFilmElement = movieCardComponent.getElement().querySelector(`.film-card__title`);
  const posterFilmElement = movieCardComponent.getElement().querySelector(`.film-card__poster`);
  const commentsCountFilmElement = movieCardComponent.getElement().querySelector(`.film-card__comments`);

  // Показывает попап
  const showFilmDetails = () => {
    const closeButton = filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
    render(document.body, filmCardDetails.getElement(), RenderPosition.BEFOREEND);
    closeButton.addEventListener(`click`, onCloseButton);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  // Закрывает попап по клику на крестик
  const onCloseButton = () => {
    const closeButton = filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
    document.body.removeChild(filmCardDetails.getElement());
    filmCardDetails.removeElement();
    closeButton.removeEventListener(`click`, onCloseButton);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      onCloseButton();
    }
  };

  [titleFilmElement, posterFilmElement, commentsCountFilmElement].forEach((cardElement) => {
    cardElement.addEventListener(`click`, () => {
      showFilmDetails();
    });
  });

  render(place, movieCardComponent.getElement(), position);
};

// Отрисуем блок юзера
const user = new TitleUserView();
render(siteHeaderElement, user.getElement(), RenderPosition.BEFOREEND);

// Отрисуем меню сайта
const siteMenu = new SiteMenuView(films);
render(siteMainElement, siteMenu.getElement(), RenderPosition.BEFOREEND);

// Отрисуем сортировку
const sort = new SortView();
render(siteMainElement, sort.getElement(), RenderPosition.BEFOREEND);

const renderMainContent = () => {
  // Отрисуем пустую секцию контента
  const contentSection = new ContentSectionView();
  render(siteMainElement, contentSection.getElement(), RenderPosition.BEFOREEND);

  // Найдем элемент для отрисовки фильмов
  const filmsListElement = contentSection.getElement().querySelector(`.films-list`);

  if (!films.length) {
    filmsListElement.innerHTML = ``;
    render(filmsListElement, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  // Найдем блок-контейнер в который будем отрисовывать карточки с фильмами
  const filmListContainerElement = contentSection.getElement().querySelector(`.films-list__container`);

  // Отрисуем карточки фильмов в секцию контента
  for (let i = 0; i < Math.min(films.length, NUMBER_FILMS_PER_STEP); i++) {
    renderCardFilm(filmListContainerElement, films[i], RenderPosition.BEFOREEND);
  }

  // Отрисуем кнопку "show more"
  if (films.length > NUMBER_FILMS_PER_STEP) {
    let renderedFilmCount = NUMBER_FILMS_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(filmsListElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    const loadMoreButton = loadMoreButtonComponent.getElement();

    // По клику на "show more" покажем еще карточки с фильмами
    loadMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + NUMBER_FILMS_PER_STEP)
        .forEach((film) => {
          renderCardFilm(filmListContainerElement, film, RenderPosition.BEFOREEND);
        });
      renderedFilmCount += NUMBER_FILMS_PER_STEP;

      // Если показаны все фильмы скроем кнопку "show more"
      if (renderedFilmCount >= films.length) {
        loadMoreButton.remove();
      }
    });
  }

  // Найдем элемент для отрисовки доп блоков
  const filmsElement = contentSection.getElement();

  // Отрисуем пустой доп блок "Top rated"
  const filmsListExtraTopRated = new FilmsListExtraSectionView(`Top rated`);
  render(filmsElement, filmsListExtraTopRated.getElement(), RenderPosition.BEFOREEND);

  // Отрисуем пустой доп блок "Most commented"
  const filmsListExtraMostCommented = new FilmsListExtraSectionView(`Most commented`);
  render(filmsElement, filmsListExtraMostCommented.getElement(), RenderPosition.BEFOREEND);

  // Отрисуем карточки с фильмами в блок "Top rated"
  const extraTopRatedFilmListContainerElement = filmsListExtraTopRated.getElement().querySelector(`.films-list__container`);
  films.sort((a, b) => b.rating - a.rating);
  films
    .slice(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS)
    .forEach((film) => {
      renderCardFilm(extraTopRatedFilmListContainerElement, film, RenderPosition.BEFOREEND);
    });

  // Отрисуем карточки с фильмами в блок "Most commented"
  const extraMostCommentedFilmListContainerElement = filmsListExtraMostCommented.getElement().querySelector(`.films-list__container`);
  films.sort((a, b) => b.comments.length - a.comments.length);
  films
    .slice(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS)
    .forEach((film) => {
      renderCardFilm(extraMostCommentedFilmListContainerElement, film, RenderPosition.BEFOREEND);
    });
};

renderMainContent();

// Отрисуем блок статистики
const statistics = new StatisticsView(films.length);
render(siteFooterElement, statistics.getElement(), RenderPosition.BEFOREEND);
