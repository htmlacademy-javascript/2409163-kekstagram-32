import {addImageUploadControllerListener} from './form-open.js';
import {getData} from './server_api.js';
import {renderThumbnails} from './thumbnails-render.js';
import {addCommentLoaderListener, addThumbnailsListener} from './big-picture-open.js';
import {addThumbnailsFiltersListener, showThumbnailsFiltersContainer} from './thumbnails-sort-filter.js';
import {showErrorDataMessage} from './util.js';


try {
  addImageUploadControllerListener();
  const photosData = await getData();
  await addThumbnailsFiltersListener(photosData);
  renderThumbnails(photosData);
  addThumbnailsListener(photosData);
  showThumbnailsFiltersContainer();
  addCommentLoaderListener(photosData);


} catch {
  showErrorDataMessage();
}


