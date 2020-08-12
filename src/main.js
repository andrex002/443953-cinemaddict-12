import {createTitleUserTemplate} from "./view/title-user.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createContentSectionTemplate} from "./view/content-section.js";
import {createMovieCardTemplate} from "./view/movie-card.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createExtraSectionTemplate} from "./view/extra-section.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createDetailedInformationTemplate} from "./view/detailed-information.js";
import {createDetailedInformationCommentTemplate} from "./view/detailed-information-comment.js";
import {generateMovieCard} from "./mock/movie-card-mock.js";
import {generateComment} from "./mock/comment-mock.js";

const NUMBER_FILMS = 22;
const NUMBER_FILMS_PER_STEP = 5;
const NUMBER_FILMS_IN_ADDITIONAL_BLOCKS = 2;
const NUMBER_COMMENTS = 4;

const films = new Array(NUMBER_FILMS).fill(``).map(generateMovieCard);
const comments = new Array(NUMBER_COMMENTS).fill(``).map(generateComment);
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createTitleUserTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(films), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createContentSectionTemplate(), `beforeend`);

const filmListContainerElement = siteMainElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, NUMBER_FILMS_PER_STEP); i++) {
  render(filmListContainerElement, createMovieCardTemplate(films[i]), `beforeend`);
}


if (films.length > NUMBER_FILMS_PER_STEP) {
  let renderedFilmCount = NUMBER_FILMS_PER_STEP;
  render(filmListContainerElement, createLoadMoreButtonTemplate(), `afterend`);

  const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + NUMBER_FILMS_PER_STEP)
      .forEach((film) => render(filmListContainerElement, createMovieCardTemplate(film), `beforeend`));

    renderedFilmCount += NUMBER_FILMS_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createExtraSectionTemplate(`Top rated`), `beforeend`);
render(filmsElement, createExtraSectionTemplate(`Most commented`), `beforeend`);

const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElement.forEach((item) => {
  const extraFilmListContainerElement = item.querySelector(`.films-list__container`);
  const nameExtra = item.querySelector(`.films-list__title`).textContent;
  if (nameExtra === `Top rated`) {
    films.sort((a, b) => b.rating - a.rating);
    films
    .slice(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS)
    .forEach((film) => render(extraFilmListContainerElement, createMovieCardTemplate(film), `beforeend`));
  }
  if (nameExtra === `Most commented`) {
    films.sort((a, b) => b.commentsCount - a.commentsCount);
    films
    .slice(0, NUMBER_FILMS_IN_ADDITIONAL_BLOCKS)
    .forEach((film) => render(extraFilmListContainerElement, createMovieCardTemplate(film), `beforeend`));
  }
});

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(films), `beforeend`);
render(siteFooterElement, createDetailedInformationTemplate(films[0]), `afterend`);

const filmDetailsCommentsList = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < NUMBER_COMMENTS; i++) {
  render(filmDetailsCommentsList, createDetailedInformationCommentTemplate(comments[i]), `beforeend`);
}

