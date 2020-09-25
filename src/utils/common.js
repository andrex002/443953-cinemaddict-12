import {SHAKE_ANIMATION_TIMEOUT} from '../const';

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const generateDateInIsoFormat = (date) => new Date(date).toISOString();

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const shakeEffect = (component) => {
  component.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  setTimeout(() => {
    component.getElement().style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};
