import { EFFECTS } from './constants.js';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

if (!imgUploadPreview || !effectsList || !effectLevelSlider || !effectLevelValue || !effectLevelContainer) {
  throw new Error('Не найдены необходимые элементы для управления эффектами');
}

let currentEffect = 'none';

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return Number(value);
    },
    from: function (value) {
      return Number(value);
    }
  }
});

const applyEffect = () => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = '';
    return;
  }

  const sliderValue = effectLevelSlider.noUiSlider.get();
  const filterValue = effect.min + (sliderValue / 100) * (effect.max - effect.min);

  imgUploadPreview.style.filter = `${effect.style}(${filterValue}${effect.unit})`;
  effectLevelValue.value = sliderValue;
};

const updateSlider = () => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    step: (effect.step / (effect.max - effect.min)) * 100,
    start: 100
  });
};

const updatePreviewClass = (oldEffect, newEffect) => {
  imgUploadPreview.classList.remove(`effects__preview--${oldEffect}`);
  if (newEffect !== 'none') {
    imgUploadPreview.classList.add(`effects__preview--${newEffect}`);
  }
};

const switchEffect = (newEffect) => {
  const oldEffect = currentEffect;
  currentEffect = newEffect;
  updatePreviewClass(oldEffect, newEffect);
  updateSlider();
  applyEffect();
};

const onEffectChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    switchEffect(evt.target.value);
  }
};


const onSliderUpdate = () => {
  applyEffect();
};

const resetEffects = () => {

  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = 'none';

  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  effectLevelContainer.classList.add('hidden');
  imgUploadPreview.style.filter = '';
  effectLevelValue.value = '';
};

const initEffectsController = () => {
  effectsList.addEventListener('change', onEffectChange);
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  resetEffects();
};

initEffectsController();

export { resetEffects };
