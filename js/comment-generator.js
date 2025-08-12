import {CONFIG, MESSAGES, NAMES} from './constants.js';
import {getRandomInteger, getRandomArrayElement} from './utils.js';


let commentIdCounter = 1;

export const createComment = () => {
  const messageCount = getRandomInteger(CONFIG.MESSAGE_COUNT_RANGE.min, CONFIG.MESSAGE_COUNT_RANGE.max);
  let message = getRandomArrayElement(MESSAGES);

  if (messageCount === 2) {
    let secondMessage = getRandomArrayElement(MESSAGES);

    while (secondMessage === message) {
      secondMessage = getRandomArrayElement(MESSAGES);
    }
    message += ` ${ secondMessage}`;
  }

  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(CONFIG.AVATAR_RANGE.min, CONFIG.AVATAR_RANGE.max)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES)
  };
};
