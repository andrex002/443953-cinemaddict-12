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
      // this._commentsModel.set(comments);
      this.renderCommentsList(this._comments);

      this._newCommentComponent = new NewCommentView();
      console.log(this._newCommentContainer)
      console.log(this._newCommentComponent)
      render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
      this._newCommentComponent.setSubmitCommentHandler(this._handleCommentSubmit);
   }

   _handleCommentDeleteClick(userAction, updateType, update) {
      this._commentsModel.delete(updateType, update);
      this._commentPresenter[update.id].destroy();
      this._changeData(
         userAction,
         updateType,
         Object.assign(
            {},
            this._film,
            {
               comments: this._commentsModel.getByIds(update.id)
            }
         )
      );
   }

   _handleCommentSubmit() {
      this._commentsModel.add(UpdateType.PATCH, this._newCommentComponent.getNewComment());

      this._changeData(
         UserAction.UPDATE_FILM,
         UpdateType.PATCH,
         Object.assign(
            {},
            this._film,
            {
               comments: this._commentsModel.getComments()
            }
         )
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

   renderCommentsList(comments) {
      // const comments = this._commentsModel.get();
      this._renderComments(comments);
   }
}