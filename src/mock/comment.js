import { getRandomElement, generateDateInIsoFormat, generateId} from '../utils/common.js';
import {USERS, EMOJI} from '../const.js';

export const generateComment = () => {
  return {
    id: generateId(),
    author: getRandomElement(USERS),
    text: `Interesting setting and a good cast`,
    emoji: getRandomElement(EMOJI),
    date: generateDateInIsoFormat(),
  };
};
export const generateComments = (countComment) => {
  const comments = [];
  for(let i = 0; i < countComment; i++) {
    comments.push(generateComment());
  }
  return comments;
};