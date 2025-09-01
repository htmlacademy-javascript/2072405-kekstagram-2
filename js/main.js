import { generatePhotos } from './photo-generator.js';
import { renderThumbnails } from './gallery-renderer.js';
import './form-upload.js';
import './form-validation.js';
import './scale-controller.js';
import './effects-controller.js';

const photos = generatePhotos();
renderThumbnails(photos);
