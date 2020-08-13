import {getRandomInteger, addZero} from '../utils.js';
import {USERS, EMOJI} from '../const.js';

const generateDate = () => {
  let date = new Date();
  return `${date.getFullYear()}/${addZero(date.getMonth() + 1)}/${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};

export const generateComment = () => {
  return {
    author: USERS[getRandomInteger(0, USERS.length - 1)],
    text: `Interesting setting and a good cast`,
    emoji: EMOJI[getRandomInteger(0, EMOJI.length - 1)],
    date: generateDate(),
  };
};
