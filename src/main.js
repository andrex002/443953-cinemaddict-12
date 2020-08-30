import {generateMovieCard} from "./mock/movie-card.js";

import TitleUserView from "./view/title-user.js";
import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";

const NUMBER_FILMS = 22;


// Получим массив с фильмами
const films = new Array(NUMBER_FILMS).fill(``).map(generateMovieCard);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Отрисуем блок юзера
render(siteHeaderElement, new TitleUserView(), RenderPosition.BEFOREEND);

// Отрисуем меню сайта
render(siteMainElement, new SiteMenuView(films), RenderPosition.BEFOREEND);

// Отрисуем сортировку
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

// Отрисуем блок статистики
render(siteFooterElement, new StatisticsView(films.length), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(films);
