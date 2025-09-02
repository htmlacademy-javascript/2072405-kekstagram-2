export const NAMES = [
  'Иван',
  'Мария',
  'Алексей',
  'Елена',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Ольга',
  'Максим',
  'Екатерина'
];

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const DESCRIPTIONS = [
  'Закат на пляже',
  'Горный пейзаж',
  'Городская архитектура',
  'Портрет друга',
  'Натюрморт с фруктами',
  'Дождливый день',
  'Семейное фото',
  'Концерт в парке',
  'Прогулка по лесу',
  'Вечер в кафе',
  'Море и волны',
  'Зимний пейзаж',
  'Цветы в саду',
  'Уличное искусство',
  'Котёнок играет',
  'Рассвет в горах',
  'Ночной город',
  'Пикник на природе',
  'Осенние листья',
  'Спортивное мероприятие',
  'Винтажная машина',
  'Романтический ужин',
  'Детская площадка',
  'Музей изнутри',
  'Танцы на площади'
];

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

export const DEFAULT_IMAGE = 'img/placeholder.jpg';
export const DEFAULT_DESCRIPTION = 'Фото без описания';
export const COMMENTS_STEP = 5;
export const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
export const MAX_HASHTAGS_COUNT = 5;
export const MAX_DESCRIPTION_LENGTH = 140;


