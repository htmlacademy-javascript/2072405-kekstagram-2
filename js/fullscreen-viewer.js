import { DEFAULT_IMAGE, DEFAULT_DESCRIPTION, COMMENTS_STEP } from './constants.js';
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

const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

if (!bigPictureElement || !bigPictureImg || !likesCount || !commentsContainer) {
  throw new Error('Не найдены необходимые элементы для полноэкранного просмотра');
}

let currentEscHandler = null;
let allComments = [];
let shownCommentsCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = avatar || DEFAULT_IMAGE;
  avatarImg.alt = name || 'Пользователь';
  avatarImg.width = 35;
  avatarImg.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message || '';

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(commentText);

  return commentElement;
};

const updateCommentsCounter = () => {
  if (commentsShownCount) {
    commentsShownCount.textContent = shownCommentsCount;
  }
  if (commentsTotalCount) {
    commentsTotalCount.textContent = allComments.length;
  }
};

const hideCommentsLoader = () => {
  if (commentsLoader) {
    commentsLoader.classList.add('hidden');
  }
};

const showCommentsControls = () => {
  if (socialCommentCount) {
    socialCommentCount.classList.remove('hidden');
  }
  if (commentsLoader && shownCommentsCount < allComments.length) {
    commentsLoader.classList.remove('hidden');
  }
};

const showNextComments = () => {
  const fragment = document.createDocumentFragment();

  const nextComments = allComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);

  nextComments.forEach((comment) =>{
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);

  shownCommentsCount += nextComments.length;
  updateCommentsCounter();

  if (shownCommentsCount >= allComments.length) {
    hideCommentsLoader();
  }
};

const initComments = (comments) => {
  allComments = Array.isArray(comments) ? comments : [];
  shownCommentsCount = 0;

  commentsContainer.textContent = '';

  if (allComments.length > 0) {
    showNextComments();
    showCommentsControls();
  } else {
    updateCommentsCounter();
  }
};

const fillBigPicture = (photoData) => {
  const { url, description, likes, comments } = photoData;

  bigPictureImg.src = url || DEFAULT_IMAGE;
  bigPictureImg.alt = description || DEFAULT_DESCRIPTION;
  likesCount.textContent = likes ?? 0;
  socialCaption.textContent = description || DEFAULT_DESCRIPTION;

  initComments(comments);
};

const onLoadMoreCommentsClick = () => {
  showNextComments();
};

export const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  if (currentEscHandler) {
    document.removeEventListener('keydown', currentEscHandler);
    currentEscHandler = null;
  }

  if (socialCommentCount) {
    socialCommentCount.classList.add('hidden');
  }
  if (commentsLoader) {
    commentsLoader.classList.add('hidden');
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

export const openBigPicture = (photoData) => {
  fillBigPicture(photoData);
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  currentEscHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  document.addEventListener('keydown', currentEscHandler);

  if (closeButton) {
    closeButton.focus();
  }
};

if (closeButton) {
  closeButton.addEventListener('click', onCloseButtonClick);
}

if (commentsLoader) {
  commentsLoader.addEventListener('click', onLoadMoreCommentsClick);
}
