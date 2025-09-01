import { isEscapeKey } from './utils.js';
import { resetScale } from './scale-controller.js';
import { resetEffects } from './effects-controller.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const body = document.body;

if (!imgUploadForm || !imgUploadInput || !imgUploadOverlay) {
  throw new Error('Не найдены необходимые элементы формы загрузки');
}

let currentEscHandler = null;

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  if (currentEscHandler) {
    document.removeEventListener('keydown', currentEscHandler);
    currentEscHandler = null;
  }

  imgUploadForm.reset();
  imgUploadInput.value = '';

  resetScale();
  resetEffects();
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

export { openUploadForm, closeUploadForm };
