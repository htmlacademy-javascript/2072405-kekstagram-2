const NAMES = [
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

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
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

const PHOTOS_COUNT = 25;

const LIKES_RANGE = {min: 15, max: 200};

const COMMENTS_RANGE = {min: 0, max: 30};

const MESSAGE_COUNT_RANGE = {min: 1, max: 2};

const AVATAR_RANGE = {min: 1, max: 6};

let commentIdCounter = 1;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => {
  const messageCount = getRandomInteger(MESSAGE_COUNT_RANGE.min, MESSAGE_COUNT_RANGE.max);
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
    avatar: `img/avatar-${getRandomInteger(AVATAR_RANGE.min, AVATAR_RANGE.max)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES)
  };
};

const createPhoto = (index) => {
  const commentsCount = getRandomInteger(COMMENTS_RANGE.min, COMMENTS_RANGE.max);
  const comments = Array.from({length: commentsCount}, createComment);

  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomInteger(LIKES_RANGE.min, LIKES_RANGE.max),
    comments: comments
  };
};

const photos = Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index));

// eslint-disable-next-line no-console
console.log(photos);
