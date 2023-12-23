import {
  state,
} from '../../common';

const storedJobItems = localStorage.getItem('bookmarkCityItems');
if (storedJobItems) {
  state.bookmarkCityItems = JSON.parse(storedJobItems);
}
