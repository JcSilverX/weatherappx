export const enableDismissTrigger = (Component, method = 'hide') => {
  const EVENT_CLICK = 'click';
  const { NAME } = Component;

  const SELECTOR_DATA_DISMISS = `[data-jsx-dismiss="${NAME}"]`;
  document.querySelectorAll(SELECTOR_DATA_DISMISS)
    .forEach((selector) => {
      selector.addEventListener(EVENT_CLICK, (event) => {
        const THIS = event.target.closest(SELECTOR_DATA_DISMISS);

        event.preventDefault();

        const instance = new Component(THIS.closest(`.${NAME}`));
        instance[method]();
      });
    });
};

// ------------------------------------- //
//  weatherappx related
// ------------------------------------- //
// CONSTANTS
export const BASE_API_URL = 'https://api.open-meteo.com/v1/forecast?';
export const BASE_GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/';
export const BASE_AQI_API_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality?';

export const INCHES_OF_MERCURY = 0.02952998057228486;
export const ICONS_MAP = new Map();
export const ICON_DESCRIPTION_MAP = new Map();
export const UV_INDEX_MAP = new Map();
export const AQI_LEVELS_MAP = new Map();

// STATE
export const state = {
  searchCityItems: [],
  bookmarkCityItems: [],
  activeCityItem: {},
  bookmarkedCityItem: {},
  currentForecast: {},
  hourlyForecast: {},
  dailyForecast: {},
  aqi: {},
};

// EVENT HANDLERS
export const EVENT_KEYDOWN = 'keydown';
export const EVENT_SUBMIT = 'submit';
export const EVENT_CLICK = 'click';
export const EVENT_LOAD = 'DOMContentLoaded';
export const EVENT_HASCHANGE = 'hashchange';

// SELECTORS
export const searchEl = document.querySelector('#search');
export const searchFormEl = document.querySelector('.search');
export const searchInputEl = document.querySelector('.search__input');
export const searchResultsHelpEl = document.querySelector('.search-results__help');
export const searchBtnClear = document.querySelector('.search-btn__clear');
export const errorTextEl = document.querySelector('.error__text');
export const spinnerSearchEl = document.querySelector('.spinner--search');
export const cityListSearchEl = document.querySelector('.city-list--search');
export const cityListBookmarkEl = document.querySelector('.city-list--bookmark');
export const bookmarksEl = document.querySelector('.bookmarks');
export const bookmarksTitleEl = document.querySelector('.second-heading--bookmarks');
export const weatherDetailsContentEl = document.querySelector('.weather-details__content');
export const spinnerWeatherDetails = document.querySelector('.spinner--weather-details');

// HELPER / UTILITY FUNCTIONS
export const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) { // 4xx, 5xx status code
    throw new Error(data.description);
  }

  return data;
};

export const reflow = (element) => element.offsetHeight;

export const elementFromHtml = (html) => {
  const template = document.createElement('template');

  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

export const dateTimeFormatter = (
  options,
  date,
) => new Intl.DateTimeFormat(undefined, options).format(date);

export const timeToPercent = (current, total) => {
  const [cHour, cMinutes] = current.split(':').map((i) => Number(i));
  const [tHour, tMinutes] = total.split(':').map((i) => Number(i));

  const currentTime = ((cHour * 60) + cMinutes) / 1000;
  const totalTime = ((tHour * 60) + tMinutes) / 1000;

  return Number(currentTime / totalTime);
};

export const timeDuration = (start, end) => {
  const [startH, startM] = start.split(':').map((i) => Number(i));
  const [endH, endM] = end.split(':').map((i) => Number(i));

  if (startM < endM) {
    return `${endH - startH}hr ${endM - startM}mins`;
  }
  if (startM > endM) {
    return `${(endH - 1) - startH}hr ${(endM + 60) - startM}mins`;
  }
  return 0;
};

export const mgPerCubicMeterToPPB = (conc, molecularWeight) => (24.45 * conc) / molecularWeight;

export const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
