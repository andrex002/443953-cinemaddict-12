export const getWatchedFilmsCount = (films) => {
   return films.filter((film) => film.isWatched).length;
};

export const getFilmsDuration = (films) => {
   return films.reduce((count, film) => {
      return count + film.duration;
   }, 0);
};

export const sortedGenres = (data) => {
   if (data.length === 0) {
      return data.length;
   }
   const allGenres = [];

   data.forEach((film) => {
      allGenres.push(...film.genres);
   });

   let amountWatchedGenres = {};
   allGenres.forEach((genre) => {
      amountWatchedGenres[genre] = amountWatchedGenres[genre] + 1 || 1;
   });

   return amountWatchedGenres;
};

export const definitionTopGenre = (data) => {

   if (data.length === 0) {
      return ``;
   }

   const amountWatchedGenres = sortedGenres(data);

   function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
   }

   return getKeyByValue(amountWatchedGenres, Math.max.apply(null, Object.values(amountWatchedGenres)));
};

export const getProfileRating = (films) => {
   const watchedFilmsCount = getWatchedFilmsCount(films);

   switch (true) {
      case (watchedFilmsCount >= 1 && watchedFilmsCount <= 10):
         return `novice`;
      case (watchedFilmsCount >= 11 && watchedFilmsCount <= 20):
         return `fan`;
      case (watchedFilmsCount >= 21):
         return `movie buff`;
      default:
         return ``;
   }
};