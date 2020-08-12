import {getRandomInteger} from '../utils.js';
import {TITLES, POSTERS} from '../const.js';


const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, TITLES.length - 1);
  return TITLES[randomIndex];
};

const generatePoster = () => {
  const randomIndex = getRandomInteger(0, POSTERS.length - 1);
  return POSTERS[randomIndex];
};

const generateDescription = () => {
  const descriptions = descriptionText.split(`. `);
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateRating = () => {
  return getRandomInteger(0, 100) / 10;
};

export const generateMovieCard = () => {
  return {
    title: generateTitle(),
    originalTitle: ``,
    poster: generatePoster(),
    rating: generateRating(),
    yearOfProduction: getRandomInteger(1950, 2020),
    duration: `1h 30m`,
    genre: `Musical`,
    description: generateDescription(),
    commentsCount: getRandomInteger(0, 100),
    producer: `James Cameron`,
    screenwriters: [`John`, `David`],
    actors: [`Bruce Lee`, `VanDamme`, `Jacke Chan`],
    dateOfRelease: `10 August 2020`,
    country: `USA`,
    genres: [`Musical`, `Drama`, `Comedy`],
    ageRating: `${getRandomInteger(0, 18)}+`,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
