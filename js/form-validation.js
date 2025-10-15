import { HASHTAG_REGEX, MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, MAX_DESCRIPTION_LENGTH} from './constants.js';

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
  const hashtagsValue = value.trim();

  if (!hashtagsValue) {
    return [];
  }

  return hashtagsValue.toLowerCase().split(/\s+/);
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

const getHashtagError = (value) => {
  const hashtags = parseHashtags(value);

  if (hashtags.length === 0) {
    return '';
  }

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEX.test(hashtag)) {
      if (!hashtag.startsWith('#')) {
        return 'Хэштег должен начинаться с символа #';
      }
      if (hashtag === '#') {
        return 'Хэш-тег не может состоять только из решётки';
      }
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        return `Максимальная длина хэш-тега ${MAX_HASHTAG_LENGTH} символов`;
      }
      return 'Хэштег содержит недопустимые символы';
    }
  }

  return '';
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const getDescriptionError = () =>
  `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`;

if (hashtagsInput) {
  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagError);
}

if (descriptionInput) {
  pristine.addValidator(descriptionInput, validateDescription, getDescriptionError);
}

export { pristine };
