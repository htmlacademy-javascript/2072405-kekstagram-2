import { isEscapeKey } from './utils.js';

const body = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, innerSelector, buttonSelector) => {
  const message = template.cloneNode(true);
  body.appendChild(message);

  const controller = new AbortController();
  const { signal } = controller;

  const closeMessage = () => {
    message.remove();
    controller.abort();
  };

  const button = message.querySelector(buttonSelector);
  button.addEventListener('click', closeMessage);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }, { signal });

  document.addEventListener('click', (evt) => {
    if (!message.querySelector(innerSelector).contains(evt.target)) {
      closeMessage();
    }
  }, { signal });
};

const showSuccessMessage = () => showMessage(successTemplate, '.success__inner', '.success__button');
const showErrorMessage = () => showMessage(errorTemplate, '.error__inner', '.error__button');

const showDataErrorMessage = () => {
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  body.appendChild(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showDataErrorMessage };
