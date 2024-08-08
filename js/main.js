import {addImageUploadControllerListener} from './form-open';
import {getData} from './server_api';
import {renderThumbnails} from './thumbnails-render';
import {addThumbnailsListener} from './big-picture-open';
import {showErrorDataMessage} from './util';
import {addThumbnailsFilterButtonsListeners, showThumbnailsFiltersContainer} from './thumbnails-sort-filter';

addThumbnailsFilterButtonsListeners();

try {
  addImageUploadControllerListener();
  const photosData = await getData();
  renderThumbnails(photosData);
  showThumbnailsFiltersContainer();
  addThumbnailsListener();

} catch {
  showErrorDataMessage();
}

