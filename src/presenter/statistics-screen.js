import StatisticsScreenView from "../view/statistics-screen.js";
import SiteMenuView from "../view/site-menu.js";
import { render, remove, RenderPosition } from '../utils/render';

export default class StatisticsScreen {
  constructor(statisticsContainer, filmsModel) {
    this._statisticsContainer = statisticsContainer;
    this._filmsModel = filmsModel;
  }

  init() {
    this._statisticsComponent = new StatisticsScreenView(this._filmsModel.getFilms());
    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
    // this._statisticsComponent.restoreHandlers();
  }

  destroy() {
    remove(this._statisticsComponent);
  }

  
}