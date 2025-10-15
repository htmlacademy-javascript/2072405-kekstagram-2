import { isEscapeKey } from './utils.js';

const body = document.body;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, innerSelector, buttonSelector) => {
  if (!template) {
    return;
  }

  const message = template.cloneNode(true);
  body.appendChild(message);

  const controller = new AbortController();
  const { signal } = controller;

  const closeMessage = () => {
    if (message.parentNode) {
      message.remove();
    }
    controller.abort();
  };

  const button = message.querySelector(buttonSelector);

  const onButtonClick = () => {
    closeMessage();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!message.querySelector(innerSelector).contains(evt.target)) {
      closeMessage();
    }
  };

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown, { signal, capture: true });
  document.addEventListener('click', onDocumentClick, { signal });
};

const showSuccessMessage = () => showMessage(successTemplate, '.success__inner', '.success__button');

const showErrorMessage = () => showMessage(errorTemplate, '.error__inner', '.error__button');

const showDataErrorMessage = () => {
  if (!dataErrorTemplate) {
    return;
  }

  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  body.appendChild(dataErrorMessage);

  setTimeout(() => {
    if (dataErrorMessage.parentNode) {
      dataErrorMessage.remove();
    }
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showDataErrorMessage };
