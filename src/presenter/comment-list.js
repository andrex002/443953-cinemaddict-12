import CommentPresenter from './comment.js';
import NewCommentView from '../view/new-comment.js';
import {UserAction, UpdateType} from '../const.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CommentList {
  constructor(commentsContainer, newCommentContainer, film, changeData, commentsModel, api) {
    this._commentsContainer = commentsContainer;
    this._newCommentContainer = newCommentContainer;
    this._film = film;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._commentPresenter = {};
    this._api = api;

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init(comments) {
    this._comments = comments;
    this._commentsModel.set(this._comments); //
    this.renderCommentsList();

    this._newCommentComponent = new NewCommentView();
    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setSubmitCommentHandler(this._handleCommentSubmit);
  }

  _handleCommentDeleteClick(userAction, updateType, update) {
    this._commentPresenter[update.id].destroy();
    this._api.deleteComment(update).then(() => {
      this._commentsModel.delete(updateType, update);
      this._changeData(
          userAction,
          updateType,
          this._film
      );
    });
  }

  _handleCommentSubmit() {
    const newComment = this._newCommentComponent.getNewComment();

    this._api.addComment(this._film, newComment)
      .then((response) => {
        this._commentsModel.add(UpdateType.PATCH, response.comments);

        this._changeData(
            UserAction.ADD_COMMENT,
            UpdateType.PATCH,
            this._film,
            {
              comments: this._commentsModel.get()
            }
        );
      });
  }

  _renderComment(comment) {
    this._comment = comment;
    const commentPresenter = new CommentPresenter(this._commentsContainer, this._handleCommentDeleteClick, this._handleCommentSubmit);
    commentPresenter.init(this._comment);
    this._commentPresenter[this._comment.id] = commentPresenter;
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  renderCommentsList() {
    const comments = this._commentsModel.get();
    this._renderComments(comments);
  }
}
