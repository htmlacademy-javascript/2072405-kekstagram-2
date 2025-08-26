import { generatePhotos } from './photo-generator.js';
import { renderThumbnails } from './gallery-renderer.js';
import './fullscreen-viewer.js';

const photos = generatePhotos();

renderThumbnails(photos);
