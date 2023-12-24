/* eslint-disable no-underscore-dangle */
import Modal from '../Modal';

import {
  BASE_API_URL,
  BASE_AQI_API_URL,
  BASE_GEOCODING_API_URL,
  EVENT_CLICK,
  EVENT_KEYDOWN,
  EVENT_SUBMIT,
  cityListBookmarkEl,
  cityListSearchEl,
  getData,
  searchBtnClear,
  searchEl,
  searchFormEl,
  searchInputEl,
  searchResultsHelpEl,
  state,
  weatherDetailsContentEl,
} from '../../common';

import renderError from './Error';
import renderSpinner from './Spinner';
import renderCityList from './CityList';
import renderWeatherDetails from './WeatherDetails';

export default class Search extends Modal {
  // eslint-disable-next-line no-useless-constructor
  constructor(element) {
    super(element);
  }

  // getters/setters

  // public methods

  // private methods

  // static methods
  static keydownHandler(event) {
    const instance = new Search(searchEl);

    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      instance.toggle();
    }
  }

  static async submitHandler(event) {
    event.preventDefault();

    const searchText = searchInputEl.value;

    const forbiddenPattern = /[^A-Za-z0-9\s]+/g;
    const patternMatch = forbiddenPattern.test(searchText);

    searchResultsHelpEl.classList.add('visually-hidden');

    if (patternMatch || searchText.length === 0 || searchText.length === 1) {
      cityListSearchEl.innerHTML = '';
      renderError('No locations found');
      return;
    }

    searchInputEl.blur();

    renderError('');

    cityListSearchEl.innerHTML = '';

    renderSpinner('search');

    try {
      const data = await getData(`${BASE_GEOCODING_API_URL}search?name=${searchText}&count=10&language=en&format=json`);

      const { results: cityItems } = data;

      if (cityItems === undefined) {
        cityListSearchEl.innerHTML = '';
        renderSpinner('search');
        renderError('No locations found');
        return;
      }

      renderSpinner('search');

      // update state
      state.searchCityItems = cityItems;

      cityListBookmarkEl.innerHTML = '';
      renderCityList('search');
    } catch (error) {
      renderError(error.message);
    }
  }

  static async clickHandler(event) {
    event.preventDefault();

    if (event.target.className.includes('bookmarks')) {
      return;
    }

    // get clicked city item element
    const cityItemEl = event.target.closest('.city-item');

    // remove the active class from the previously active city items
    document.querySelectorAll('.city-item.city-item--active')
      .forEach((cityItemWithActiveClass) => cityItemWithActiveClass.classList.remove('city-item--active'));

    // add active class
    cityItemEl.classList.add('city-item--active');

    // empty the weather details content
    weatherDetailsContentEl.innerHTML = '';

    // render spinner
    renderSpinner('weather-details');

    // get the id
    const { id } = cityItemEl;

    // update state
    const allCityItems = [...state.searchCityItems, ...state.bookmarkCityItems];
    state.activeCityItem = allCityItems.find((cityItem) => cityItem.id === +id);

    // add id to url
    window.history.pushState(null, '', `/#${id}`);

    // hide modal
    new Search(searchEl).hide();

    try {
      const { latitude: lat, longitude: long, timezone } = await getData(`${BASE_GEOCODING_API_URL}get?id=${id}&language=en&format=json`);
      const { current, hourly, daily } = await getData(`${BASE_API_URL}latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,visibility,uv_index,uv_index_clear_sky,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}&forecast_days=10`);
      const { current: aqi } = await getData(`${BASE_AQI_API_URL}latitude=${lat}&longitude=${long}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index,uv_index_clear_sky&timeformat=unixtime&timezone=${timezone}&forecast_days=7`);

      // render spinner
      renderSpinner('weather-details');

      // update state
      state.currentForecast = current;
      state.hourlyForecast = hourly;
      state.dailyForecast = daily;
      state.aqi = aqi;

      // render weather details
      renderWeatherDetails();
    } catch (error) {
      renderError(error.message);
    }
  }

  static clearInput(event) {
    event.preventDefault();

    searchInputEl.value = '';
    renderError('');
  }
}

document.addEventListener(EVENT_KEYDOWN, Search.keydownHandler);
searchFormEl.addEventListener(EVENT_SUBMIT, Search.submitHandler);
cityListSearchEl.addEventListener(EVENT_CLICK, Search.clickHandler);
cityListBookmarkEl.addEventListener(EVENT_CLICK, Search.clickHandler);
searchBtnClear.addEventListener(EVENT_CLICK, Search.clearInput);
