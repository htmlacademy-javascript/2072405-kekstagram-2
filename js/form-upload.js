import { isEscapeKey } from './utils.js';
import { resetScale } from './scale-controller.js';
import { resetEffects } from './effects-controller.js';
import { sendData } from './api-client.js';
import { showSuccessMessage, showErrorMessage } from './message-manager.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const body = document.body;

if (!imgUploadForm || !imgUploadInput || !imgUploadOverlay) {
  throw new Error('Не найдены необходимые элементы формы загрузки');
}

let currentEscHandler = null;

const toggleSubmitButton = (disabled) => {
  submitButton.disabled = disabled;
  submitButton.textContent = disabled ? 'Отправляю...' : 'Опубликовать';
};

const resetForm = () => {
  imgUploadForm.reset();
  imgUploadInput.value = '';
  resetScale();
  resetEffects();
  toggleSubmitButton(false);
};

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  if (currentEscHandler) {
    document.removeEventListener('keydown', currentEscHandler);
    currentEscHandler = null;
  }

  resetForm();
};

const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
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

const attachEscapeHandler = (handler) => {
  document.addEventListener('keydown', handler);
};

const openUploadForm = () => {
  showModal();
  currentEscHandler = createEscapeHandler();
  attachEscapeHandler(currentEscHandler);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  toggleSubmitButton(true);

  try {
    await sendData(formData);
    closeUploadForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

const onFileInputChange = () => {
  openUploadForm();
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

if (imgUploadInput) {
  imgUploadInput.addEventListener('change', onFileInputChange);
}

if (imgUploadCancel) {
  imgUploadCancel.addEventListener('click', onCancelButtonClick);
}

imgUploadForm.addEventListener('submit', onFormSubmit);

export { openUploadForm, closeUploadForm };
