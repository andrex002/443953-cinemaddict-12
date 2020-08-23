import {getRandomElement, getRandomInteger} from '../utils.js';
import {TITLES, POSTERS, DESCRIPTION_TEXT, PRODUCERS, SCREENWRITERS, ACTORS, COUNTRIES, GENRES} from '../const.js';
import {generateComment} from './comment.js';

const generateTitle = () => getRandomElement(TITLES);

const generatePoster = () => getRandomElement(POSTERS);

const generateProducer = () => getRandomElement(PRODUCERS);

const generateScreenwriters = () => getRandomElement(SCREENWRITERS);

const generateActors = () => getRandomElement(ACTORS);

const generateDescription = () => {
  const descriptions = DESCRIPTION_TEXT.split(`. `);
  return getRandomElement(descriptions);
};

const generateComments = () => new Array(getRandomInteger(0, 10)).fill(``).map(generateComment);

const generateRating = () => getRandomInteger(0, 100) / 10;

const getBoolean = () => Boolean(getRandomInteger(0, 1));

export const generateMovieCard = () => {
  return {
    title: generateTitle(),
    originalTitle: ``,
    poster: generatePoster(),
    rating: generateRating(),
    yearOfProduction: getRandomInteger(1950, 2020),
    duration: `1h 30m`,
    description: generateDescription(),
    comments: generateComments(),
    producer: generateProducer(),
    screenwriters: generateScreenwriters(),
    actors: generateActors(),
    dateOfRelease: `10 August 2020`,
    country: getRandomElement(COUNTRIES),
    genres: getRandomElement(GENRES),
    ageRating: `${getRandomInteger(0, 18)}+`,
    isWatchlist: getBoolean(),
    isWatched: getBoolean(),
    isFavorite: getBoolean(),
  };
};
