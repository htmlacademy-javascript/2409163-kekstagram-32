import {photosData} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import { bigPictureEventListeners } from './big_picture.js';

renderThumbnails(photosData);
bigPictureEventListeners();

