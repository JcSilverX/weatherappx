import {
  EVENT_CLICK,
  EVENT_LOAD,
  cityListBookmarkEl,
  cityListSearchEl,
  searchResultsHelpEl,
  state,
} from '../../common';
import renderCityList from './CityList';
import Search from './Search';

export default class Bookmarks extends Search {
  // eslint-disable-next-line no-useless-constructor
  constructor(element) {
    super(element);
  }

  // getters/setters

  // public methods

  // private methods

  // static methods
  static clickHandler(event) {
    const THIS = event.target;

    if (!THIS.className.includes('bookmarks')) return;

    const cityItemEl = THIS.closest('.city-item');

    cityItemEl.classList.add('city-item--bookmarked');

    // update state
    const allCityItems = [...state.searchCityItems, ...state.bookmarkCityItems];
    state.bookmarkedCityItem = allCityItems
      .find((cityItem) => cityItem.id === +cityItemEl.id);

    if (state.bookmarkCityItems
      .some((bookmarkCityItem) => bookmarkCityItem.id === state.bookmarkedCityItem.id)) {
      state.bookmarkCityItems = state.bookmarkCityItems
        .filter((bookmarkCityItem) => (bookmarkCityItem).id !== state.bookmarkedCityItem.id);
    } else {
      state.bookmarkCityItems.push(state.bookmarkedCityItem);
    }

    // persist data with localStorage
    localStorage.setItem('bookmarkCityItems', JSON.stringify(state.bookmarkCityItems));

    // update bookmark icon
    THIS.classList.toggle('bookmarks-btn__icon--bookmarked');

    // render city list
    renderCityList('search');
  }

  static documentLoadHandler() {
    if (state.bookmarkCityItems.length === 0) return;

    // remove start screen text
    searchResultsHelpEl.classList.add('visually-hidden');

    // render bookmarked items
    renderCityList('bookmarks');
  }
}

cityListSearchEl.addEventListener(EVENT_CLICK, Bookmarks.clickHandler);
cityListBookmarkEl.addEventListener(EVENT_CLICK, Bookmarks.clickHandler);
document.addEventListener(EVENT_LOAD, Bookmarks.documentLoadHandler);
