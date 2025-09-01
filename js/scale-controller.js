import { SCALE_CONFIG } from './constants.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

if (!scaleControlSmaller || !scaleControlBigger || !scaleControlValue || !imgUploadPreview) {
  throw new Error('Не найдены необходимые элементы для управления масштабом');
}

let currentScale = SCALE_CONFIG.DEFAULT;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
};

const getScaleDirection = (target) => {
  if (target === scaleControlSmaller) {
    return -1;
  }
  if (target === scaleControlBigger) {
    return 1;
  }
  return 0;
};

const isScaleValid = (newScale) => newScale >= SCALE_CONFIG.MIN && newScale <= SCALE_CONFIG.MAX;

const changeScale = (direction) => {
  const newScale = currentScale + (direction * SCALE_CONFIG.STEP);
  if (isScaleValid(newScale)) {
    currentScale = newScale;
    updateScale();
  }
};

const onScaleControlClick = (evt) => {
  const direction = getScaleDirection(evt.target);
  if (direction !== 0) {
    changeScale(direction);
  }
};

const resetScale = () => {
  currentScale = SCALE_CONFIG.DEFAULT;
  updateScale();
};

const initScaleController = () => {
  scaleControlSmaller.addEventListener('click', onScaleControlClick);
  scaleControlBigger.addEventListener('click', onScaleControlClick);

  resetScale();
};

initScaleController();

export { resetScale };
