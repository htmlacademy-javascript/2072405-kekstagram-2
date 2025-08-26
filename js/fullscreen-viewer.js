import { DEFAULT_IMAGE, DEFAULT_DESCRIPTION } from './constants.js';
import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentsShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPictureElement.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const body = document.body;

// Элементы,которые скрываем по ТЗ
const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

if (!bigPictureElement || !bigPictureImg || !likesCount || !commentsContainer) {
  throw new Error('Не найдены необходимые элементы для полноэкранного просмотра');
}

let currentEscHandler = null;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${avatar || DEFAULT_IMAGE}"
      alt="${name || 'Пользователь'}"
      width="35"
      height="35">
    <p class="social__text">${message || ''}</p>
  `;

  return commentElement;
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';

  if (!Array.isArray(comments) || comments.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
};

const fillBigPicture = (photoData) => {
  const { url, description, likes, comments } = photoData;

  bigPictureImg.src = url || DEFAULT_IMAGE;
  bigPictureImg.alt = description || DEFAULT_DESCRIPTION;
  likesCount.textContent = likes ?? 0;
  socialCaption.textContent = description || DEFAULT_DESCRIPTION;

  const commentsArray = Array.isArray(comments) ? comments : [];
  renderComments(commentsArray);

  if (commentsShownCount && commentsTotalCount) {
    const totalComments = commentsArray.length;
    commentsShownCount.textContent = totalComments;
    commentsTotalCount.textContent = totalComments;
  }
};

const hideCommentControls = () => {
  if (socialCommentCount) {
    socialCommentCount.classList.add('hidden');
  }
  if (commentsLoader) {
    commentsLoader.classList.add('hidden');
  }
};

export const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  if (currentEscHandler) {
    document.removeEventListener('keydown', currentEscHandler);
    currentEscHandler = null;
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

export const openBigPicture = (photoData) => {
  fillBigPicture(photoData);
  hideCommentControls();
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  currentEscHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  document.addEventListener('keydown', currentEscHandler);
};

if (closeButton) {
  closeButton.addEventListener('click', onCloseButtonClick);
}
