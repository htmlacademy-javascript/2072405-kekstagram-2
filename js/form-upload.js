import { isEscapeKey } from './utils.js';
import { resetScale } from './scale-controller.js';
import { resetEffects } from './effects-controller.js';
import { sendData } from './api-client.js';
import { showSuccessMessage, showErrorMessage } from './message-manager.js';
import { pristine } from './form-validation.js';
import { FILE_VALIDATION, DEFAULT_UPLOAD_IMAGE } from './constants.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const body = document.body;

if (!imgUploadForm || !imgUploadInput || !imgUploadOverlay) {
  throw new Error('Не найдены необходимые элементы формы загрузки');
}

if (!imgUploadPreview) {
  throw new Error('Не найден элемент превью изображения');
}

let currentEscHandler = null;
let isSubmitting = false;

const setModalState = (isOpen) => {
  if (isOpen) {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  } else {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const setSubmittingState = (submitting) => {
  isSubmitting = submitting;
  submitButton.disabled = submitting;
  submitButton.textContent = submitting ? 'Отправляю...' : 'Опубликовать';
};

const validateFile = (file) => {
  if (!file) {
    // eslint-disable-next-line no-console
    console.warn('Валидация файла: файл не выбран');
    return { isValid: false, reason: 'no_file' };
  }

  if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type)) {
    // eslint-disable-next-line no-console
    console.warn(`Валидация файла: неподдерживаемый тип "${file.type}". Разрешены: ${FILE_VALIDATION.ALLOWED_TYPES.join(', ')}`);
    return { isValid: false, reason: 'invalid_type' };
  }


  if (file.size > FILE_VALIDATION.MAX_SIZE) {
    // eslint-disable-next-line no-console
    console.warn(`Валидация файла: размер ${(file.size / 1024 / 1024).toFixed(2)}MB превышает лимит ${FILE_VALIDATION.MAX_SIZE / 1024 / 1024}MB`);
    return { isValid: false, reason: 'file_too_large' };
  }

  // eslint-disable-next-line no-console
  console.log(`Валидация файла: ✓ OK. Тип: ${file.type}, размер: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
  return { isValid: true };
};

const loadImage = (file) => {
  const validation = validateFile(file);
  if (!validation.isValid) {
    showErrorMessage();
    return;
  }

  const fileReader = new FileReader();

  fileReader.addEventListener('load', () => {
    const imageUrl = fileReader.result;
    // eslint-disable-next-line no-console
    console.log('FileReader: ✓ изображение успешно загружено для превью');

    imgUploadPreview.src = imageUrl;

    if (effectsPreviews.length > 0) {
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageUrl})`;
      });
    }
  });

  fileReader.addEventListener('error', () => {
    // eslint-disable-next-line no-console
    console.error('FileReader: ✗ ошибка при чтении файла', fileReader.error);
    showErrorMessage();
  });

  fileReader.readAsDataURL(file);
};

const resetForm = () => {
  imgUploadForm.reset();
  imgUploadInput.value = '';

  imgUploadPreview.src = DEFAULT_UPLOAD_IMAGE;

  if (effectsPreviews.length > 0) {
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = '';
    });
  }

  resetScale();
  resetEffects();
  setSubmittingState(false);
  pristine.reset();
};

const closeUploadForm = () => {
  pristine.reset();
  setModalState(false);

  if (currentEscHandler) {
    document.removeEventListener('keydown', currentEscHandler);
    currentEscHandler = null;
  }

  resetForm();
};

const createEscapeHandler = () => (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagsInput ||
        document.activeElement === descriptionInput) {
      return;
    }

    evt.preventDefault();
    closeUploadForm();
  }
};

const openUploadForm = () => {
  setModalState(true);
  currentEscHandler = createEscapeHandler();
  document.addEventListener('keydown', currentEscHandler);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (isSubmitting) {
    return;
  }

  if (!pristine.validate()) {
    // eslint-disable-next-line no-console
    console.warn('Отправка формы: ✗ валидация Pristine не прошла (хештеги/комментарий)');
    return;
  }

  if (!imgUploadInput.files.length) {
    // eslint-disable-next-line no-console
    console.warn('Отправка формы: ✗ файл не выбран');
    showErrorMessage();
    return;
  }

  const formData = new FormData(evt.target);
  setSubmittingState(true);

  try {
    await sendData(formData);
    // eslint-disable-next-line no-console
    console.log('Отправка формы: ✓ успешно отправлено на сервер');
    closeUploadForm();
    showSuccessMessage();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Отправка формы: ✗ ошибка при отправке', error);
    showErrorMessage();
  } finally {
    setSubmittingState(false);
  }
};

const onFileInputChange = () => {
  const file = imgUploadInput.files[0];

  // eslint-disable-next-line no-console
  console.log('Выбор файла:', file ?
    `"${file.name}" (${file.type}, ${(file.size / 1024).toFixed(2)}KB)` :
    'файл не выбран'
  );

  loadImage(file);
  openUploadForm();
};

if (imgUploadInput) {
  imgUploadInput.addEventListener('change', onFileInputChange);
}

if (imgUploadCancel) {
  imgUploadCancel.addEventListener('click', closeUploadForm);
}

imgUploadForm.addEventListener('submit', onFormSubmit);

export { openUploadForm, closeUploadForm };
