import {photosData} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import { bigPictureEventListeners } from './big_picture.js';
import {ImgUploadControllerListener} from './form_open_close_validation.js';
import './form_scale.js';
import './form_effects.js';

renderThumbnails(photosData);
bigPictureEventListeners();
ImgUploadControllerListener();
