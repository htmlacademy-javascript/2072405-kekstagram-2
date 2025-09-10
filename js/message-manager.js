import { isEscapeKey } from './utils.js';

const body = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  body.appendChild(successMessage);

  const controller = new AbortController();
  const { signal } = controller;

  const closeMessage = () => {
    successMessage.remove();
    controller.abort();
  };

  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', closeMessage);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }, { signal });

  document.addEventListener('click', (evt) => {
    if (!successMessage.querySelector('.success__inner').contains(evt.target)) {
      closeMessage();
    }
  }, { signal });
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  body.appendChild(errorMessage);

  const controller = new AbortController();
  const { signal } = controller;

  const closeMessage = () => {
    errorMessage.remove();
    controller.abort();
  };

  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }, { signal });

  document.addEventListener('click', (evt) => {
    if (!errorMessage.querySelector('.error__inner').contains(evt.target)) {
      closeMessage();
    }
  }, { signal });
};

const showDataErrorMessage = () => {
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  body.appendChild(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showDataErrorMessage };
