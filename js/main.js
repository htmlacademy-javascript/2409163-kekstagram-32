import {photosData} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import { bigPictureEventListeners } from './big_picture.js';
import './form.js';

renderThumbnails(photosData);
bigPictureEventListeners();

