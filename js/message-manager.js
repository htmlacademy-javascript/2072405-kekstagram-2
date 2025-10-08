import { isEscapeKey } from './utils.js';

const body = document.body;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, innerSelector, buttonSelector) => {
  if (!template) {
    // eslint-disable-next-line no-console
    console.error('Шаблон сообщения не найден');
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

const showErrorMessage = (customMessage) => {
  if (!errorTemplate) {
    // eslint-disable-next-line no-console
    console.error('Шаблон сообщения об ошибке не найден');
    return;
  }

  const message = errorTemplate.cloneNode(true);

  if (customMessage) {
    const titleElement = message.querySelector('.error__title');
    if (titleElement) {
      titleElement.textContent = customMessage;
    }
  }

  body.appendChild(message);

  const controller = new AbortController();
  const { signal } = controller;

  const closeMessage = () => {
    if (message.parentNode) {
      message.remove();
    }
    controller.abort();
  };

  const button = message.querySelector('.error__button');
  button.addEventListener('click', closeMessage);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }, { signal });

  document.addEventListener('click', (evt) => {
    if (!message.querySelector('.error__inner').contains(evt.target)) {
      closeMessage();
    }
  }, { signal });
};

const showDataErrorMessage = () => {
  if (!dataErrorTemplate) {
    // eslint-disable-next-line no-console
    console.error('Шаблон соообщения об ошибке данных не найден');
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
