import SmartView from './smart';
import {getWatchedFilmsCount, getFilmsDuration, definitionTopGenre, getProfileRating} from '../utils/statistics.js';
import {StatisticPeriod} from '../const.js';

const createStatisticsScreenTemplate = (films, currentPeriod = 'all-time') => {
   const watchedFilms = films.filter((film) => film.isWatched);
   const watchedFilmsCount = getWatchedFilmsCount(watchedFilms);
   const filmsDuration = getFilmsDuration(watchedFilms);
   const totalDurationHours = Math.floor(filmsDuration / 60);
   const totalDurationMinutes = filmsDuration % 60;
   const topGenre = definitionTopGenre(watchedFilms);
   const rankLabel = getProfileRating(watchedFilms);

   return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankLabel}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${currentPeriod === StatisticPeriod.ALL_TIME ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentPeriod === StatisticPeriod.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentPeriod === StatisticPeriod.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentPeriod === StatisticPeriod.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentPeriod === StatisticPeriod.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDurationHours} <span class="statistic__item-description">h</span> ${totalDurationMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`;
}

export default class StatisticsScreen extends SmartView {
   constructor(films) {
      super();

      this._films = films;
   }

   getTemplate() {
      return createStatisticsScreenTemplate(this._films);
   }
}