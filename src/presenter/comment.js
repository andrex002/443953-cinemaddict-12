import DetailedCommentView from '../view/detailed-information-comment.js';
import {render, remove, RenderPosition} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';
import {shakeEffect} from '../utils/common.js';

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

  shakeDeletingComment() {
    shakeEffect(this._commentComponent);
  }

  disabledButton() {
    this._commentComponent.disabledButton();
  }

  setDeletingState() {
    this._commentComponent.setDeletingState();
  }

  setDeleteState() {
    this._commentComponent.setDeleteState();
  }

  deployButton() {
    this._commentComponent.deployButton();
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
