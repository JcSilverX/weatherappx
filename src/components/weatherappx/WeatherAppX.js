import {
  BASE_API_URL,
  BASE_AQI_API_URL,
  BASE_GEOCODING_API_URL,
  EVENT_LOAD, getData, state, weatherDetailsContentEl,
} from '../../common';
import renderError from './Error';
import renderSpinner from './Spinner';
import renderWeatherDetails from './WeatherDetails';

export default class WeatherX {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {
  }

  // getters/setters

  // public methods

  // private methods

  // static methods
  static async initApp() {
    const id = 5128581;

    weatherDetailsContentEl.innerHTML = '';

    // add spinner
    renderSpinner('weather-details');

    try {
      const location = await getData(`${BASE_GEOCODING_API_URL}get?id=${id}&language=en&format=json`);

      const { latitude: lat, longitude: long, timezone } = location;

      const { current, hourly, daily } = await getData(`${BASE_API_URL}latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,visibility,uv_index,uv_index_clear_sky,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}&forecast_days=10`);
      const { current: aqi } = await getData(`${BASE_AQI_API_URL}latitude=${lat}&longitude=${long}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index,uv_index_clear_sky&timeformat=unixtime&timezone=${timezone}&forecast_days=7`);

      // render spinner
      renderSpinner('weather-details');

      // update state
      state.activeCityItem = location;
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
}

window.addEventListener(EVENT_LOAD, WeatherX.initApp);
