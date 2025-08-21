const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnailElement = pictureTemplate.cloneNode(true);

  const image = thumbnailElement.querySelector('.picture__img');
  const likesElement = thumbnailElement.querySelector('.picture__likes');
  const commentsElement = thumbnailElement.querySelector('.picture__comments');

  image.src = photo.url;
  image.alt = photo.description;
  likesElement.textContent = photo.likes;
  commentsElement.textContent = photo.comments.length;

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

