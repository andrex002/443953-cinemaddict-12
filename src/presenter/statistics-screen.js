import StatisticsScreenView from "../view/statistics-screen.js";
import { render, remove, RenderPosition } from '../utils/render';
import { getWatchedFilmsCount, getFilmsDuration, definitionTopGenre, getProfileRating } from '../utils/statistics.js';

export default class StatisticsScreen {
  constructor(statisticsContainer, filmsModel) {
    this._statisticsContainer = statisticsContainer;
    this._filmsModel = filmsModel;
    this._films = this._filmsModel.get();
  }

  init() {
    this._statisticsComponent = new StatisticsScreenView(this._getWatchedFilms(), this._calculateWatchedFilmsCount(), this._getTotalDurationHours(), this._getTotalDurationMinutes(), this._getTopGenre(), this._getRankLabel());
    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.restoreHandlers();
  }

  destroy() {
    remove(this._statisticsComponent);
  }

  _getWatchedFilms() {
    return this._films.filter((film) => film.isWatched);
  }

  _calculateWatchedFilmsCount() {
    const watchedFilms = this._getWatchedFilms();

    return getWatchedFilmsCount(watchedFilms);
  }

  _getTotalDurationHours() {
    const filmsDuration = getFilmsDuration(this._getWatchedFilms());
    return Math.floor(filmsDuration / 60);
  }

  _getTotalDurationMinutes() {
    const filmsDuration = getFilmsDuration(this._getWatchedFilms());
    return filmsDuration % 60;
  }

  _getTopGenre() {
    return definitionTopGenre(this._getWatchedFilms());
  }

  _getRankLabel() {
    return getProfileRating(this._getWatchedFilms());
  }
}
