import {getRandomElement, addZero} from '../utils/common.js';
import {USERS, EMOJI} from '../const.js';

const generateDate = () => {
  let date = new Date();
  return `${date.getFullYear()}/${addZero(date.getMonth() + 1)}/${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};

export const generateComment = () => {
  return {
    author: getRandomElement(USERS),
    text: `Interesting setting and a good cast`,
    emoji: getRandomElement(EMOJI),
    date: generateDate(),
  };
};
