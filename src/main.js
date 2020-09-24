import TitleUserView from "./view/title-user.js";
import StatisticsView from "./view/statistics.js";
import StatisticsScreenPresenter from "./presenter/statistics-screen.js";
import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import PageModeModel from "./model/page-mode.js";
import {render, RenderPosition} from "./utils/render.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";
import {AUTORIZATION, END_POINT} from './const';

const api = new Api(END_POINT, AUTORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
const pageModeModel = new PageModeModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentsModel, api);
const statisticsScreenPresenter = new StatisticsScreenPresenter(siteMainElement, filmsModel, movieListPresenter, pageModeModel);

const renderStaticComponents = () => {
  render(siteHeaderElement, new TitleUserView(filmsModel.get()), RenderPosition.BEFOREEND);
  render(siteFooterElement, new StatisticsView(filmsModel.areExist()), RenderPosition.BEFOREEND);
};

api.getFilms().then((films) => {
  filmsModel.set(UpdateType.INIT, films);
  renderStaticComponents();
}).catch(() => {
  filmsModel.set(UpdateType.INIT, []);
  renderStaticComponents();
});

new FilterPresenter(siteMainElement, filterModel, filmsModel, movieListPresenter, statisticsScreenPresenter, pageModeModel).init();

movieListPresenter.init();
