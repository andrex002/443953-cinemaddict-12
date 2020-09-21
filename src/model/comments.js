import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  getByIds(ids) {
    return this._comments.filter((comment) => ids.includes(comment.id));
  }

  get() {
    return this._comments;
  }

  add(updateType, update) {
    this._comments = [update, ...this._comments];
    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType, update);
  }
}
