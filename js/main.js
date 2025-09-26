import { renderThumbnails } from './gallery-renderer.js';
import { getData } from './api-client.js';
import { showDataErrorMessage } from './message-manager.js';
import './form-upload.js';
import './form-validation.js';
import './scale-controller.js';
import './effects-controller.js';

const initApp = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
  } catch (error) {
    showDataErrorMessage();
  }
};

initApp();
