import CommentPresenter from './comment.js';
import NewCommentView from '../view/new-comment.js';
import {UserAction, UpdateType} from '../const.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CommentList {
  constructor(commentsContainer, newCommentContainer, film, changeData, commentsModel) {
    this._commentsContainer = commentsContainer;
    this._newCommentContainer = newCommentContainer;
    this._film = film;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._commentPresenter = {};

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init(comments) {
    this._comments = comments;
    this._commentsModel.set(this._comments); //
    console.log(this._commentsModel)
    this.renderCommentsList();

    this._newCommentComponent = new NewCommentView();
    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setSubmitCommentHandler(this._handleCommentSubmit);
  }

  _handleCommentDeleteClick(userAction, updateType, update) {
    this._commentPresenter[update.id].destroy();
    this._changeData(
        userAction,
        updateType,
        this._film,
        update
    );
  }

  _handleCommentSubmit() {
    // debugger;
    console.log(this._newCommentComponent.getNewComment())
    // this._commentsModel.add(UpdateType.PATCH, this._newCommentComponent.getNewComment());
    console.log(this._commentsModel)
    console.log(this._film)
    console.log(this._commentsModel.get())

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      this._film
      // Object.assign(
      //   {},
      //   this._film,
      //   {
      //     comments: this._commentsModel.get()
      //   }
      // )
      ,
      this._newCommentComponent.getNewComment()
        // this._film,
        // this._newCommentComponent.getNewComment()
    );
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
