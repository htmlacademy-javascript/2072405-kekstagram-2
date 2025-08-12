import {CONFIG, DESCRIPTIONS} from './constants.js';
import {getRandomInteger} from './utils.js';
import { createComment } from './comment-generator.js';

const createPhoto = (index) => {
  const commentsCount = getRandomInteger(CONFIG.COMMENTS_RANGE.min, CONFIG.COMMENTS_RANGE.max);
  const comments = Array.from({length: commentsCount}, createComment);

  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomInteger(CONFIG.LIKES_RANGE.min, CONFIG.LIKES_RANGE.max),
    comments: comments
  };
};

export const generatePhotos = () => Array.from({length: CONFIG.PHOTOS_COUNT}, (_, index) => createPhoto(index));
