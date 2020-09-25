import StatisticsScreenView from "../view/statistics-screen.js";
import {render, remove, RenderPosition} from '../utils/render';
import {getWatchedFilmsCount, getFilmsDuration, definitionTopGenre, getProfileRating} from '../utils/statistics.js';
import {getCurrentDate} from "../utils/common";
import {StatisticPeriod} from "../const";
import moment from "moment";

const MINUTE_IN_HOURS = 60;

export default class StatisticsScreen {
  constructor(statisticsContainer, filmsModel) {
    this._statisticsContainer = statisticsContainer;
    this._filmsModel = filmsModel;

    this._currentPeriod = StatisticPeriod.ALL_TIME;

    this._periodChangeHandler = this._periodChangeHandler.bind(this);
  }

  init() {
    this._statisticsComponent = new StatisticsScreenView(this._getStatisticsData());
    this._statisticsComponent.setStatisticsFilterHandler(this._periodChangeHandler);
    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._statisticsComponent);
  }

  _getStatisticsData() {
    const filteredFilms = this._getWatchedFilms();

    return {
      watchedFilms: filteredFilms,
      watchedFilmsCount: this._calculateWatchedFilmsCount(filteredFilms),
      totalDurationHours: this._getTotalDurationHours(filteredFilms),
      totalDurationMinutes: this._getTotalDurationMinutes(filteredFilms),
      topGenre: this._getTopGenre(filteredFilms),
      rankLabel: this._getRankLabel(),
      currentPeriod: this._currentPeriod
    };
  }

  _getWatchedFilms() {
    const filteredFilms = this._filmsModel.get().filter((film) => film.isWatched);

    const dateAWeekAgo = moment().subtract(7, `days`);
    const dateAMonthAgo = moment().subtract(1, `month`);
    const dateAYearAgo = moment().subtract(1, `years`);

    switch (this._currentPeriod) {
      case StatisticPeriod.ALL_TIME:
        return filteredFilms;
      case StatisticPeriod.TODAY:
        return filteredFilms.filter((watchedFilm) => moment(watchedFilm.watchingDate).isSame(getCurrentDate(), `day`));
      case StatisticPeriod.WEEK:
        return filteredFilms.filter((watchedFilm) => moment(watchedFilm.watchingDate).isBetween(dateAWeekAgo, getCurrentDate()));
      case StatisticPeriod.MONTH:
        return filteredFilms.filter((watchedFilm) => moment(watchedFilm.watchingDate).isBetween(dateAMonthAgo, getCurrentDate()));
      case StatisticPeriod.YEAR:
        return filteredFilms.filter((watchedFilm) => moment(watchedFilm.watchingDate).isBetween(dateAYearAgo, getCurrentDate()));
    }

    return filteredFilms;
  }

  _calculateWatchedFilmsCount(films) {
    return getWatchedFilmsCount(films);
  }

  _getTotalDurationHours(films) {
    return Math.floor(getFilmsDuration(films) / MINUTE_IN_HOURS);
  }

  _getTotalDurationMinutes(films) {
    return getFilmsDuration(films) % MINUTE_IN_HOURS;
  }

  _getTopGenre(films) {
    return definitionTopGenre(films);
  }

  _getRankLabel() {
    return getProfileRating(this._filmsModel.get());
  }

  _periodChangeHandler(evt) {
    if (evt.target.classList.contains(`statistic__filters-input`)) {
      evt.preventDefault();

      this._currentPeriod = evt.target.value;

      this.destroy();
      this.init();
    }
  }
}
