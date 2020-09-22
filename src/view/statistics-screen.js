import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {StatisticPeriod, BAR_HEIGHT} from '../const.js';
import {sortedGenres} from '../utils/statistics.js';

const renderGenreChart = (statisticCtx, films) => {
  const genres = Object.keys(sortedGenres(films));
  const genresCount = Object.values(sortedGenres(films));
  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: genresCount,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsScreenTemplate = (watchedFilmsCount, totalDurationHours, totalDurationMinutes, topGenre, rankLabel, currentPeriod) => {
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
};

export default class StatisticsScreen extends SmartView {
  constructor({watchedFilms, watchedFilmsCount, totalDurationHours, totalDurationMinutes, topGenre, rankLabel, currentPeriod}) {
    super();

    this._watchedFilms = watchedFilms;
    this._watchedFilmsCount = watchedFilmsCount;
    this._totalDurationHours = totalDurationHours;
    this._totalDurationMinutes = totalDurationMinutes;
    this._topGenre = topGenre;
    this._rankLabel = rankLabel;
    this._currentPeriod = currentPeriod;
    this._genreChart = null;

    this._setChart();
  }

  getTemplate() {
    return createStatisticsScreenTemplate(this._watchedFilmsCount, this._totalDurationHours, this._totalDurationMinutes, this._topGenre, this._rankLabel, this._currentPeriod);
  }

  setStatisticsFilterHandler(callback) {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, callback);
  }

  _setChart() {
    if (this._genreChart !== null) {
      this._genreChart = null;
    }

    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    this._genreChart = renderGenreChart(statisticCtx, this._watchedFilms);
  }
}
