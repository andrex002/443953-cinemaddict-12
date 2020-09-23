import he from 'he';
import {formatCommentDate} from "../utils/films.js";
import SmartView from "./smart.js";

const createDetailedInformationCommentTemplate = ({id, author, comment, emotion, date}) => {
  return (
    `<li class="film-details__comment" id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class DetailedComment extends SmartView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createDetailedInformationCommentTemplate(this._comment);
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._comment);
  }

  setCommentDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteButtonClickHandler);
  }
}
