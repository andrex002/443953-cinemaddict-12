import Observer from "../utils/observer.js";
import moment from 'moment';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  get() {
    return this._films;
  }

  update(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        title: film.film_info.title,
        originalTitle: film.film_info.alternative_title,
        poster: film.film_info.poster,
        rating: film.film_info.total_rating,
        yearOfProduction: moment(film.film_info.release.date).format(`YYYY`),
        duration: film.film_info.runtime,
        description: film.film_info.description,
        producer: film.film_info.director,
        screenwriters: film.film_info.writers,
        actors: film.film_info.actors,
        dateOfRelease: film.film_info.release.date,
        country: film.film_info.release.release_country,
        genres: film.film_info.genre,
        ageRating: film.film_info.age_rating,
        isWatchlist: film.user_details.watchlist,
        isWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date,
        isFavorite: film.user_details.favorite
      }
    );
    
    delete adaptedFilm.film_info.title;
    delete adaptedFilm.film_info.alternative_title;
    delete adaptedFilm.film_info.poster;
    delete adaptedFilm.film_info.total_rating;
    delete adaptedFilm.film_info.release;
    delete adaptedFilm.film_info.runtime;
    delete adaptedFilm.film_info.description;
    delete adaptedFilm.film_info.director;
    delete adaptedFilm.film_info.actors;
    delete adaptedFilm.film_info.genre;
    delete adaptedFilm.film_info.age_rating;
    delete adaptedFilm.user_details.watchlist;
    delete adaptedFilm.user_details.already_watched;
    delete adaptedFilm.user_details.watching_date;
    delete adaptedFilm.user_details.favorite;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        film_info: {
          title: film.title,
          alternative_title: film.originalTitle,
          poster: film.poster,
          total_rating: film.rating,
          runtime: film.duration,
          description: film.description,
          director: film.producer,
          writers: film.screenwriters,
          actors: film.actors,
          genre: film.genres,
          age_rating: film.ageRating,
          release: {
            date: film.dateOfRelease,
            release_country: film.country
          } 
        },
        user_details: {
          watchlist: film.isWatchlist,
          already_watched: film.isWatched,
          watching_date: film.watchingDate,
          favorite: film.isFavorite
        }
      }
    );

    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.poster;
    delete adaptedFilm.rating;
    delete adaptedFilm.duration;
    delete adaptedFilm.description;
    delete adaptedFilm.producer;
    delete adaptedFilm.screenwriters;
    delete adaptedFilm.actors;
    delete adaptedFilm.genres;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.dateOfRelease;
    delete adaptedFilm.country;
    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.isFavorite;

    return adaptedFilm;
  }
}
