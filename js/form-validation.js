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

const validateForm = () => {
  const hashtagsValue = hashtagsInput.value.trim();
  const descriptionValue = descriptionInput.value;

  // Валидация описания
  if (descriptionValue.length > MAX_DESCRIPTION_LENGTH) {
    return `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`;
  }

  // Валидация хэштегов
  if (!hashtagsValue) {
    return ''; // Пустые хэштеги разрешены
  }

  const hashtags = hashtagsValue.toLowerCase().split(/\s+/);

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
      if (hashtag.length > 20) {
        return 'Максимальная длина хэш-тега 20 символов';
      }
      return 'Хэштег содержит недопустимые символы';
    }
  }

  return '';
};

const isFormValid = () => validateForm() === '';
const getFormErrorMessage = () => validateForm();

pristine.addValidator(hashtagsInput, isFormValid, getFormErrorMessage);
pristine.addValidator(descriptionInput, isFormValid, getFormErrorMessage);

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);

export { pristine };
