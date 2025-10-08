export const CONFIG = {
  PHOTOS_COUNT: 25,
  LIKES_RANGE: {min: 15, max: 200},
  COMMENTS_RANGE: {min: 0, max: 30},
  MESSAGE_COUNT_RANGE: {min: 1, max: 2},
  AVATAR_RANGE: {min: 1, max: 6}
};

export const SCALE_CONFIG = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

export const EFFECTS = {
  none: {
    name: 'Оригинал',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'Хром',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'Сепия',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'Марвин',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'Фобос',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'Зной',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

export const FILE_VALIDATION = {
  ALLOWED_TYPES: ['image/jpeg', 'image/png'],
  MAX_SIZE: 20 * 1024 * 1024,
};

export const DEFAULT_IMAGE = 'img/placeholder.jpg';
export const DEFAULT_DESCRIPTION = 'Фото без описания';
export const COMMENTS_STEP = 5;
export const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
export const MAX_HASHTAGS_COUNT = 5;
export const MAX_HASHTAG_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 140;
export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
export const RANDOM_PHOTOS_COUNT = 10;
export const DEBOUNCE_DELAY = 500;
export const DEFAULT_UPLOAD_IMAGE = 'img/upload-default-image.jpg';


