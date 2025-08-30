import { HASHTAG_REGEX, MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH} from './constants.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

if (!imgUploadForm) {
  throw new Error('Форма загрузки не найдена');
}

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
};

const pristine = new Pristine(imgUploadForm, pristineConfig);
const parseHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().toLowerCase().split(/\s+/);
};

const validateHashtags = (value) => {
  const hashtags = parseHashtags(value);
  if (hashtags.length === 0) {
    return true;
  }

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

const validateHashtagCount = (hashtags) => {
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
  }
  return null;
};

const validateHashtagUniqueness = (hashtags) => {
  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }
  return null;
};

const validateHashtagFormat = (hashtags) => {
  const invalidHashtag = hashtags.find((hashtag) => !HASHTAG_REGEX.test(hashtag));
  if (!invalidHashtag) {
    return null;
  }

  if (!invalidHashtag.startsWith('#')) {
    return 'Хэштег должен начинаться с символа #';
  }
  if (invalidHashtag === '#') {
    return 'Хэш-тег не может состоять только из одной решётки';
  }
  if (invalidHashtag.length > 20) {
    return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
  }
  return 'Хэштег содержит недопустимые символы';
};

const getHashtagErrorMessage = (value) => {
  const hashtags = parseHashtags(value);
  if (hashtags.length === 0) {
    return '';
  }

  return validateHashtagCount(hashtags) ||
    validateHashtagUniqueness(hashtags) || validateHashtagFormat(hashtags) || '';
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const getDescriptionErrorMessage = () => `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`;

if (!hashtagsInput) {
  throw new Error ('Поле хэштегов не найдено - валидация недоступна');
} else {
  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagErrorMessage);
}

if (!descriptionInput) {
  throw new Error ('Поле описания не найдено - валидация недоступна');
} else {
  pristine.addValidator(descriptionInput, validateDescription, getDescriptionErrorMessage);
}

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);

export { pristine };
