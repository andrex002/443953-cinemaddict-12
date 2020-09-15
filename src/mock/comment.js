import {getRandomElement, generateDateInIsoFormat} from '../utils/common.js';
import {USERS, EMOJI} from '../const.js';

export const generateComment = () => {
  return {
    author: getRandomElement(USERS),
    text: `Interesting setting and a good cast`,
    emoji: getRandomElement(EMOJI),
    date: generateDateInIsoFormat(),
  };
};
