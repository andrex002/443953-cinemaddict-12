import {addZero, getRandomElement, getRandomInteger, getRandomListElements} from '../utils.js';
import {TITLES, POSTERS, DESCRIPTION_TEXT, PRODUCERS, SCREENWRITERS, ACTORS, COUNTRIES, GENRES, MONTH} from '../const.js';
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

const generateDuration = () => {
  const minutes = getRandomInteger(30, 180);
  const hours = Math.floor(minutes / 60);
  const durationString = `${hours}h ${addZero(minutes % 60)}m`;
  return durationString;
};

const generateDescription = () => {
  const descriptions = DESCRIPTION_TEXT.split(`. `);
  return getRandomElement(descriptions);
};

const generateGenres = () => getRandomListElements(GENRES);

const generateComments = () => new Array(getRandomInteger(0, 10)).fill(``).map(generateComment);

const generateRating = () => getRandomInteger(0, 100) / 10;

const getBoolean = () => Boolean(getRandomInteger(0, 1));

const generateYearOfProduction = () => getRandomInteger(YearOfProduction.MIN, YearOfProduction.MAX);
const yearOfProductionFilm = generateYearOfProduction();

const generateDateOfRelease = () => {
  const now = new Date();
  const year = getRandomInteger(yearOfProductionFilm, now.getFullYear());
  const month = getRandomInteger(0, 11);
  const day = getRandomInteger(1, 31);
  const dateOfRelease = new Date(year, month, day);

  return `${dateOfRelease.getDate()} ${MONTH[dateOfRelease.getMonth()]} ${dateOfRelease.getFullYear()}`;
};
generateDateOfRelease();

export const generateMovieCard = () => {
  return {
    title: generateTitle(),
    originalTitle: ``,
    poster: generatePoster(),
    rating: generateRating(),
    yearOfProduction: yearOfProductionFilm,
    duration: generateDuration(),
    description: generateDescription(),
    comments: generateComments(),
    producer: generateProducer(),
    screenwriters: generateScreenwriters(),
    actors: generateActors(),
    dateOfRelease: generateDateOfRelease(),
    country: getRandomElement(COUNTRIES),
    genres: generateGenres(),
    ageRating: `${getRandomInteger(0, 18)}+`,
    isWatchlist: getBoolean(),
    isWatched: getBoolean(),
    isFavorite: getBoolean(),
  };
};
