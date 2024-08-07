import {photosData} from './server_api.js';
import {renderThumbnails} from './thumbnails-render.js';
import {addThumbnailsListener} from './big-picture-open.js';
import {addImageUploadControllerListener} from './form-open.js';
import {addThumbnailsFilterButtonsListeners} from './thumbnails-sort-filter.js';

renderThumbnails(photosData);
addThumbnailsFilterButtonsListeners(photosData);
addThumbnailsListener();
addImageUploadControllerListener();

