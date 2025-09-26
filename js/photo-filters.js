import { renderThumbnails, clearThumbnails } from './gallery-renderer.js';
import { getRandomArrayElement, debounce } from './utils.js';
import { RANDOM_PHOTOS_COUNT } from './constants.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

if (!imgFilters || !filterDefault || !filterRandom || !filterDiscussed || !picturesContainer) {
  throw new Error('Не найдены необходимые элементы фильтров');
}

let currentFilter = 'filter-default';
let allPhotos = [];

const getDefaultPhotos = (photos) => photos.slice();

const getRandomPhotos = (photos) => {
  const availablePhotos = photos.slice();
  const result = [];

  while (result.length < Math.min(RANDOM_PHOTOS_COUNT, availablePhotos.length)) {
    const randomPhoto = getRandomArrayElement(availablePhotos);
    const index = availablePhotos.indexOf(randomPhoto);
    availablePhotos.splice(index, 1);
    result.push(randomPhoto);
  }
  return result;
};

const getDiscussedPhotos = (photos) =>
  photos.slice().sort((a,b) => b.comments.length - a.comments.length);

const updateActiveFilter = (activeFilter) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeFilter.classList.add('img-filters__button--active');
};

const applyFilter = (filterId) => {
  if (currentFilter === filterId && filterId !== 'filter-random') {
    return;
  }

  currentFilter = filterId;
  let filteredPhotos;

  switch (filterId) {
    case 'filter-random':
      filteredPhotos = getRandomPhotos(allPhotos);
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos(allPhotos);
      break;
    default:
      filteredPhotos = getDefaultPhotos(allPhotos);
  }

  clearThumbnails();
  renderThumbnails(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter);

const onFilterChange = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    updateActiveFilter(evt.target);
    debouncedApplyFilter(evt.target.id);
  }
};

const initFilters = (photos) => {
  allPhotos = photos.slice();

  imgFilters.classList.remove('img-filters--inactive');

  imgFilters.addEventListener('click', onFilterChange);

  updateActiveFilter(filterDefault);
};

export { initFilters };
