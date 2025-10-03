import { DEBOUNCE_DELAY } from './constants.js';

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => {
  if (!elements || elements.length === 0) {
    throw new Error('Массив не может быть пустым');
  }
  return elements[getRandomInteger(0, elements.length - 1)];
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();

};

export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
