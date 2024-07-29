import {photosData} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import { bigPictureEventListeners } from './big_picture.js';
import './form_validation.js';

renderThumbnails(photosData);
bigPictureEventListeners();

