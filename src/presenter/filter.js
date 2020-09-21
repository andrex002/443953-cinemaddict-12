import SiteMenuView from "../view/site-menu.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType, PageMode} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel, movieListPresenter, statisticsScreenPresenter, pageModeModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._movieListPresenter = movieListPresenter;
    this._statisticsScreenPresenter = statisticsScreenPresenter;
    this._pageModeModel = pageModeModel;
    this._currentFilter = null;

    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatisticsClick = this._handleStatisticsClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._pageModeModel.addObserver(this._handleModelEvent);

    this._pageMode = this._pageModeModel.getMode();
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new SiteMenuView(filters, this._currentFilter, this._pageMode);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatisticsClickHandler(this._handleStatisticsClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleStatisticsClick() {
    if (this._pageMode === PageMode.FILMS) {
      this._pageMode = PageMode.STATISTICS;
      this._statisticsScreenPresenter.init();
      this._movieListPresenter.destroy();
      this._pageModeModel.setMode(UpdateType.MAJOR, this._pageMode);
    } else {
      this._pageMode = PageMode.FILMS;
      this._statisticsScreenPresenter.destroy();
      this._movieListPresenter.init();
      this._pageModeModel.setMode(UpdateType.MAJOR, this._pageMode);
    }
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
  }
}
