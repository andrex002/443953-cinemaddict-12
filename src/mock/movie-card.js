import { generateDateInIsoFormat, getRandomElement, getRandomInteger, getRandomListElements, generateId} from '../utils/common.js';
import {TITLES, POSTERS, DESCRIPTION_TEXT, PRODUCERS, SCREENWRITERS, ACTORS, COUNTRIES, GENRES} from '../const.js';
import {generateComment} from './comment.js';

const YearOfProduction = {
  MAX: 2020,
  MIN: 1950
};

const generateTitle = () => getRandomElement(TITLES);

const generatePoster = () => getRandomElement(POSTERS);

const generateProducer = () => getRandomElement(PRODUCERS);

const generateScreenwriters = () => getRandomListElements(SCREENWRITERS);

const generateActors = () => getRandomListElements(ACTORS);

const generateDuration = () => getRandomInteger(30, 180);

const generateDescription = () => {
  const descriptions = DESCRIPTION_TEXT.split(`. `);
  return getRandomElement(descriptions);
};

const generateGenres = () => getRandomListElements(GENRES);

// const generateComments = () => new Array(getRandomInteger(0, 10)).fill(``).map(generateComment);

const generateRating = () => getRandomInteger(0, 100) / 10;

const getBoolean = () => Boolean(getRandomInteger(0, 1));

export const generateMovieCard = () => {
  return {
    id: generateId(),
    title: generateTitle(),
    originalTitle: ``,
    poster: generatePoster(),
    rating: generateRating(),
    yearOfProduction: getRandomInteger(YearOfProduction.MIN, YearOfProduction.MAX),
    duration: generateDuration(),
    description: generateDescription(),
    comments: [],
    producer: generateProducer(),
    screenwriters: generateScreenwriters(),
    actors: generateActors(),
    dateOfRelease: generateDateInIsoFormat(),
    country: getRandomElement(COUNTRIES),
    genres: generateGenres(),
    ageRating: `${getRandomInteger(0, 18)}+`,
    isWatchlist: getBoolean(),
    isWatched: getBoolean(),
    isFavorite: getBoolean(),
  };
};
