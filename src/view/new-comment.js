import SmartView from './smart';
import {generateDateInIsoFormat} from '../utils/common.js';

const BLANK_COMMENT = {
  emotion: `smile`,
  comment: ``
};

const createNewCommentTemplate = ({emotion, comment}) => {
  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ``}
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
    </label>
    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emotion === `smile` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emotion === `sleeping` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emotion === `puke` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emotion === `angry` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`;
};

export default class NewComment extends SmartView {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._data = NewComment.parseCommentToData(comment);

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._setInnerHandler();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  getNewComment() {
    return Object.assign(
        {},
        this._data,
        {
          author: `AndreX`,
        }
    );
  }

  restoreHandlers() {
    this._setInnerHandler();
    this.getElement().addEventListener(`keydown`, this._commentSubmitHandler);
  }

  _setInnerHandler() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentInputHandler);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiClickHandler);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
      date: generateDateInIsoFormat(Date.now())
    }, true);
  }
  _emojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value
    });
  }

  _commentSubmitHandler(evt) {
    if (evt.key === `Enter` && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      this._callback.submitComment();
    }
  }

  setSubmitCommentHandler(callback) {
    this._callback.submitComment = callback;
    this.getElement().addEventListener(`keydown`, this._commentSubmitHandler);
  }

  static parseCommentToData(comment) {
    return Object.assign({}, comment);
  }
}
