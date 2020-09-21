import {generateMovieCard} from "./mock/movie-card.js";
import FilterModel from "./model/filter.js";
import TitleUserView from "./view/title-user.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";
import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import {generateComments} from "./mock/comment.js";

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

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Отрисуем блок юзера
render(siteHeaderElement, new TitleUserView(), RenderPosition.BEFOREEND);

// Отрисуем блок статистики
render(siteFooterElement, new StatisticsView(films.length), RenderPosition.BEFOREEND);

new FilterPresenter(siteMainElement, filterModel, filmsModel).init();
new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentsModel).init();
