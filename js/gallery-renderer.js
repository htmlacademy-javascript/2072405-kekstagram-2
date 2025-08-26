import { DEFAULT_IMAGE, DEFAULT_DESCRIPTION } from './constants.js';
import { openBigPicture } from './fullscreen-viewer.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

if (!pictureTemplate || !picturesContainer) {
  throw new Error('Не найден шаблон #picture или контейнер .pictures');
}

const createThumbnail = (photo) => {
  const {url, description, likes, comments} = photo;
  const thumbnailElement = pictureTemplate.cloneNode(true);

  const image = thumbnailElement.querySelector('.picture__img');
  const likesElement = thumbnailElement.querySelector('.picture__likes');
  const commentsElement = thumbnailElement.querySelector('.picture__comments');

  image.src = url || DEFAULT_IMAGE;
  image.alt = description || DEFAULT_DESCRIPTION;
  likesElement.textContent = likes ?? 0;
  commentsElement.textContent = Array.isArray(comments) ? comments.length : 0;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return thumbnailElement;
};

export const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};
