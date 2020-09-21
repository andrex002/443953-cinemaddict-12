import {generateMovieCard} from "./mock/movie-card.js";
import { generateComments } from "./mock/comment.js";
import TitleUserView from "./view/title-user.js";
import StatisticsView from "./view/statistics.js";
import StatisticsScreenPresenter from "./presenter/statistics-screen.js";
import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import PageModeModel from "./model/page-mode.js";
import { render, RenderPosition } from "./utils/render.js";


const NUMBER_FILMS = 22;


// Получим массив с фильмами
const films = new Array(NUMBER_FILMS).fill(``).map(generateMovieCard);
const comments = generateComments(NUMBER_FILMS * 4);

for (let i = 0; i < films.length; i++) {
  films[i].comments = comments.slice(i * 4, i * 4 + 4).map((comment) => comment.id);
}

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const commentsModel = new CommentsModel();
commentsModel.set(comments);
const filterModel = new FilterModel();
const pageModeModel = new PageModeModel();


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Отрисуем блок юзера
render(siteHeaderElement, new TitleUserView(), RenderPosition.BEFOREEND);

// Отрисуем блок статистики
render(siteFooterElement, new StatisticsView(films.length), RenderPosition.BEFOREEND);
const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const statisticsScreenPresenter = new StatisticsScreenPresenter(siteMainElement, filmsModel, movieListPresenter, pageModeModel); 

new FilterPresenter(siteMainElement, filterModel, filmsModel, movieListPresenter, statisticsScreenPresenter, pageModeModel).init();
movieListPresenter.init();
statisticsScreenPresenter.init();