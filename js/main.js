import {picturesContainer, imageUploadController} from './util.js';
import {photosData} from './server_api.js';
import {renderThumbnails} from './thumbnails.js';
import {openImageUploadForm, closeImageUploadForm} from './form_open_close.js';
import {setUserFormSubmit} from './form_validation.js';
import {openBigPicture} from './big_picture.js';
import './form_scale_controller.js';
import './form_filters.js';

renderThumbnails(photosData);
picturesContainer.addEventListener('click', openBigPicture);
imageUploadController.addEventListener('change', openImageUploadForm);

setUserFormSubmit(closeImageUploadForm);

