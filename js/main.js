import { generatePhotos } from './photo-generator.js';
import { renderThumbnails } from './gallery-renderer.js';

const photos = generatePhotos();

renderThumbnails(photos);
