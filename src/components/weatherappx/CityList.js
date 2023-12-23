import {
  cityListBookmarkEl,
  cityListSearchEl,
  elementFromHtml,
  state,
} from '../../common';

const renderCityList = (whichCityList = 'search') => {
  // determine correct selector for city list (search results list or bookmarks)
  const cityListEl = whichCityList === 'search' ? cityListSearchEl : cityListBookmarkEl;

  cityListEl.innerHTML = '';

  // determine the city items that should be rendered
  let cityItems;
  if (whichCityList === 'search') {
    cityItems = state.searchCityItems;
  } else if (whichCityList === 'bookmarks') {
    cityItems = state.bookmarkCityItems;
  }

  cityItems.forEach((cityItem) => {
    const newCityItemHTML = elementFromHtml(`
      <li id=${cityItem.id} class="city-item ${state.activeCityItem.id === cityItem.id ? 'city-item--active' : ''}">
        <div class="city-item__top">
          <img src="https://hatscripts.github.io/circle-flags/flags/${cityItem.country_code.toLowerCase()}.svg" alt="${cityItem.country}" title="${cityItem.country}" class="city-item__img">
          <h3 class="third-heading">${cityItem.name}</h3>

          <button type="button" class="btn bookmarks-btn" data-jsx-btn-action="bookmark" aria-label="Bookmark" title="Bookmark">
            <i class="bi bi-star-fill bookmarks-btn__icon ${state.bookmarkCityItems.some((bookmarkCityItem) => bookmarkCityItem.id === cityItem.id) ? 'bookmarks-btn__icon--bookmarked ' : ''}"></i>
          </button>
        </div>
        <div class="city-item__bottom">
          <p class="city-item__city">${(cityItem.admin1) ? cityItem.admin1 : ''}</p>
          <p class="city-item__cords" data-jsx-cords="${cityItem.latitude} ${cityItem.longitude}">(${(cityItem.latitude).toFixed(2)}&deg; ${(cityItem.longitude).toFixed(2)}&deg;)</p>
        </div>
      </li>
    `);

    cityListEl.insertAdjacentElement('beforeend', newCityItemHTML);
  });
};

export default renderCityList;
