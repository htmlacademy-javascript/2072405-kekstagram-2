import { generatePhotos } from './photo-generator.js';
import { renderThumbnails } from './gallery-renderer.js';
import './form-upload.js';
import './form-validation.js';

const photos = generatePhotos();

renderThumbnails(photos);
