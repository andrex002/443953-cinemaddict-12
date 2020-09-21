import AbstractView from "./abstract.js";
import {getProfileRating} from "../utils/statistics.js";



const createTitleUserTemplate = (films) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getProfileRating(films)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class TitleUser extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createTitleUserTemplate(this._films);
  }
}
