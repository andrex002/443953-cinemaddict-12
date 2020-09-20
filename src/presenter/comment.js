import DetailedCommentView from '../view/detailed-information-comment.js';
import {render, remove, RenderPosition} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';

export default class Comment {
  constructor(commentsContainer, removeData) {
    this._commentsContainer = commentsContainer;
    this._removeData = removeData;
    this._comment = null;

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
  }

  init(comment) {
    this._comment = comment;
    this._commentComponent = new DetailedCommentView(this._comment);

    this._commentComponent.setCommentDeleteClickHandler(this._handleCommentDeleteClick);
  
    render(this._commentsContainer, this._commentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _handleCommentDeleteClick() {
    this._removeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      this._comment
    );
  }
}