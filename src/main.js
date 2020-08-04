import {createTitleUserTemplate} from "./view/title-user.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createContentSectionTemplate} from "./view/content-section.js";
import {createMovieCardTemplate} from "./view/movie-card.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createExtraSectionTemplate} from "./view/extra-section.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createDetailedInformationTemplate} from "./view/detailed-information.js";

const NUMBER_FILMS = 5;
const NUMBER_ADDITIONAL_BLOCKS = 2;
const NUMBER_FILMS_IN_ADDITIONAL_BLOCKS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createTitleUserTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createContentSectionTemplate(), `beforeend`);

const filmListContainerElement = siteMainElement.querySelector(`.films-list__container`);

for (let i = 0; i < NUMBER_FILMS; i++) {
  render(filmListContainerElement, createMovieCardTemplate(), `beforeend`);
}

render(filmListContainerElement, createLoadMoreButtonTemplate(), `afterend`);

const filmsElement = siteMainElement.querySelector(`.films`);

for (let i = 0; i < NUMBER_ADDITIONAL_BLOCKS; i++) {
  render(filmsElement, createExtraSectionTemplate(), `beforeend`);
}

const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmsListExtraElement.length; i++) {
  const extraFilmListContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);
  for (let j = 0; j < NUMBER_FILMS_IN_ADDITIONAL_BLOCKS; j++) {
    render(extraFilmListContainerElement, createMovieCardTemplate(), `beforeend`);
  }
}

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);
render(siteFooterElement, createDetailedInformationTemplate(), `afterend`);
