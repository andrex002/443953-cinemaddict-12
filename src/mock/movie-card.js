import {getRandomInteger} from '../utils.js';
import {TITLES, POSTERS, DESCRIPTION_TEXT, PRODUCERS, SCREENWRITERS, ACTORS} from '../const.js';
import {generateComment} from './comment.js';

const generateTitle = () => TITLES[getRandomInteger(0, TITLES.length - 1)];

const generatePoster = () => POSTERS[getRandomInteger(0, POSTERS.length - 1)];

const generateProducer = () => PRODUCERS[getRandomInteger(0, PRODUCERS.length - 1)];

const generateScreenwriters = () => SCREENWRITERS[getRandomInteger(0, SCREENWRITERS.length - 1)];

const generateActors = () => ACTORS[getRandomInteger(0, ACTORS.length - 1)];

const generateDescription = () => {
  const descriptions = DESCRIPTION_TEXT.split(`. `);
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateComments = () => new Array(getRandomInteger(0, 20)).fill(``).map(generateComment);

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
    genre: `Musical`,
    description: generateDescription(),
    comments: generateComments(),
    producer: generateProducer(),
    screenwriters: generateScreenwriters(),
    actors: generateActors(),
    dateOfRelease: `10 August 2020`,
    country: `USA`,
    genres: [`Musical`, `Drama`, `Comedy`],
    ageRating: `${getRandomInteger(0, 18)}+`,
    isWatchlist: getBoolean(),
    isWatched: getBoolean(),
    isFavorite: getBoolean(),
  };
};
