import {
  AQI_LEVELS_MAP,
  ICONS_MAP,
  ICON_DESCRIPTION_MAP,
  INCHES_OF_MERCURY,
  UV_INDEX_MAP,
  dateTimeFormatter,
  mgPerCubicMeterToPPB,
  state,
  timeDuration,
  timeToPercent,
  weatherDetailsContentEl,
} from '../../common';
import renderAQI from './AQI';
import renderIcons from './Icons';
import renderUV from './UV';
import concToAQI from './helpers/ConcToAqi';

export const parseCurrentForecast = () => {
  renderAQI();

  // current
  const {
    weather_code: weatherCode,
    temperature_2m: temperature,
    apparent_temperature: feelsLike,
    wind_speed_10m: windSpeed,
    precipitation,
    relative_humidity_2m: humidity,
    pressure_msl: pressure,
    is_day: isDay,
  } = state.currentForecast;

  // hourly
  const {
    visibility: [visibility],
    dew_point_2m: [dewPoint],
  } = state.hourlyForecast;

  // daily
  const {
    temperature_2m_max: [maxTemp],
    apparent_temperature_min: [minFeelsLikeTemp],
    sunrise: [sunrise],
    sunset: [sunset],
  } = state.dailyForecast;

  // aqi
  const {
    pm2_5: pm25,
    carbon_monoxide: co,
    nitrogen_dioxide: no,
    sulphur_dioxide: so,
    ozone: o3,
    uv_index: uvIndex,
  } = state.aqi;

  // extras
  const {
    id,
    name: city,
    admin1: st,
    country_code: countryCode,
    timezone,
  } = state.activeCityItem;

  return {
    time: new Date().getTime(),
    weatherCode,
    temperature: Math.round(temperature),
    feelsLike: Math.round(feelsLike),
    windSpeed,
    precipitation: Math.round(precipitation),
    humidity,
    pressure: (pressure * INCHES_OF_MERCURY).toFixed(2),
    isDay,

    visibility: (visibility / 5280).toFixed(1),
    dewPoint,

    maxTemp: Math.round(maxTemp),
    minFeelsLikeTemp: Math.round(minFeelsLikeTemp),
    sunrise: sunrise * 1000,
    sunset: sunset * 1000,

    id,
    city,
    st,
    countryCode,
    timezone,

    aqi: {
      pm25: concToAQI('pm2.5', pm25),
      co,
      no,
      so,
      o3: concToAQI('o3', parseFloat((mgPerCubicMeterToPPB(o3, 48) / 1000).toFixed(3))),
    },
    uvIndex: Math.round(uvIndex),
  };
};

export const renderCurrentForecast = (current) => {
  renderIcons(current.isDay);
  renderUV();

  const currentForecast = `
    <section class="current-forecast">
      <div class="current-forecast__left">
        <div class="condition">
          <div class="condition__header">
            <h2 class="second-heading">CURRENT WEATHER</h2>

            <div class="condition__header-extras">
              <i class="bi bi-bookmark-fill condition__header-icon ${state.bookmarkCityItems.some((bookmarkCityItem) => bookmarkCityItem.id === current.id) ? 'bookmarks-btn__icon--bookmarked ' : ''}"></i>
              <hr class="vr border-0" />
              <button type="button" class="btn condition__header-btn" data-jsx-btn-action="reload">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="condition-temp">
            <div class="condition-temp__top">
              <img src="https://raw.githubusercontent.com/JcSilverX/icons-jsx/main/weather/${ICONS_MAP.get(current.weatherCode)}.png" alt="" class="condition-temp__img">
                <span class="condition-temp__val">${current.temperature}&deg;F</span>
            </div>

            <h3 class="third-heading">${ICON_DESCRIPTION_MAP.get(current.weatherCode)}</h3>

            <div class="condition-temp__other">
              <p class="condition-temp__text">Feels like ${current.feelsLike}&deg;</p>
              <hr class="vr" />
              <p class="condition-temp__text">Updated at ${dateTimeFormatter({ hour: 'numeric', minute: 'numeric', timezone: current.timezone }, current.time)}</p>
            </div>
          </div>
          
          <hr class="my-3" />
          
          <div class="condition__extras">
            <p class="condition__text">
              <i class="bi bi-calendar"></i>
              ${dateTimeFormatter({ weekday: 'long', month: 'long', day: 'numeric' }, current.time)}
            </p>
            <p class="condition__text">
              <i class="bi bi-pin-map-fill"></i>
              ${current.city}, ${current.st}, ${current.countryCode}
            </p>
          </div>
        </div>
      </div>

      <div class="current-forecast__middle">
        <div class="details">
          <div class="details__left">
            <h2 class="second-heading">TODAY'S DETAILS</h2>

            <div class="aqi">
              <p class="aqi__text">AIR QUALITY</p>
              <p class="aqi__text ms-auto">
                <span class="aqi__dot aqi__dot--${AQI_LEVELS_MAP.get(current.aqi.o3).replace(/ /g, '-').toLowerCase()}">&#8226;</span>
                ${current.aqi.o3}
                <span class="text-secondary">${AQI_LEVELS_MAP.get(current.aqi.o3)}</span>
              </p>
            </div>
            
            <div class="details-list">
              <div class="details-list__item">
                <i class="bi bi-thermometer-half fs-16 p-2 rounded details-list__item-icon"></i>

                <div class="">
                  <p class="info__text text-secondary">HIGH/LOW</p>
                  <p class="info__text">${current.maxTemp}&deg; | ${current.minFeelsLikeTemp}&deg;</p>
                </div>
              </div>
              <div class="details-list__item">
                <i class="bi bi-umbrella fs-16 p-2 rounded details-list__item-icon"></i>

                <div class="">
                  <p class="info__text text-secondary">PRECIPITATION</p>
                  <p class="info__text">${current.precipitation} in</p>
                </div>  
              </div>
              <div class="details-list__item">
                <i class="bi bi-sunglasses fs-16 p-2 rounded details-list__item-icon"></i>

                <div class="">
                  <p class="info__text text-secondary">MAX UV INDEX</p>
                  <p class="info__text">${current.uvIndex} ${UV_INDEX_MAP.get(current.uvIndex)}</p>
                </div>
              </div>
              <div class="details-list__item">
                <i class="bi bi-eye fs-16 p-2 rounded details-list__item-icon"></i>

                <div class="">
                  <p class="info__text text-secondary">VISIBILITY</p>
                  <p class="info__text">${current.visibility} mi</p>
                </div>
              </div>
              <div class="details-list__item">
                <i class="bi bi-wind fs-16 p-2 rounded details-list__item-icon"></i>

                <div class="">
                  <p class="info__text text-secondary">WIND</p>
                  <p class="info__text">${current.windSpeed} mph</p>
                </div>
              </div>
              <div class="details-list__item">
                <i class="fs-12 p-2 rounded details-list__item-icon">DP</i>

                <div class="">
                  <p class="info__text text-secondary">DEW POINT</p>
                  <p class="info__text">${current.dewPoint}&deg;</p>
                </div>
              </div>
              <div class="details-list__item">
                <i class="bi bi-speedometer fs-16 p-2 rounded details-list__item-icon"></i>
                <div class="">
                  <p class="info__text text-secondary">PRESSURE</p>
                  <p class="info__text">${current.pressure} in</p>
                </div>
              </div>
              <div class="details-list__item">
                <i class="bi bi-moisture fs-16 p-2 rounded details-list__item-icon"></i>
                <div class="">
                  <p class="info__text text-secondary">HUMIDITY</p>
                  <p class="info__text">${current.humidity}%</p>
                </div>
              </div>
            </div>
          </div>

          <div class="details__right mx-auto">
            <h2 class="second-heading text-center">DAYLIGHT HOURS</h2>
              
            <wx-gauge class="gauge mx-auto" data-jsx-percent="${timeToPercent(dateTimeFormatter({ timeStyle: 'short', hour12: false }, current.time), dateTimeFormatter({ timeStyle: 'short', hour12: false }, current.sunset))}"></wx-gauge>

            <div class="daylight-hrs">
              <div class="daylight-hrs__left">
                <img src="https://github.com/JcSilverX/icons-jsx/blob/main/weather/sunrise.png?raw=true" alt="Sunrise" class="daylight-hrs__img">
                <p class="daylight-hrs__text">Sunrise</p>
                <p class="daylight-hrs__text">${dateTimeFormatter({ timeStyle: 'short', timeZone: current.timezone }, current.sunrise)}</p>
              </div>
              <div class="daylight-hrs__middle">
                <p class="daylight-hrs__text">${timeDuration(dateTimeFormatter({ timeStyle: 'short', timeZone: current.timezone, hour12: false }, current.sunrise), dateTimeFormatter({ timeStyle: 'short', timeZone: current.timezone, hour12: false }, current.sunset))}</p>
              </div>
              <div class="daylight-hrs__right">
                <img src="https://github.com/JcSilverX/icons-jsx/blob/main/weather/sunset.png?raw=true" alt="Sunset" class="daylight-hrs__img">
                <p class="daylight-hrs__text">Sunset</p>
                <p class="daylight-hrs__text">${dateTimeFormatter({ timeStyle: 'short', timeZone: current.timezone }, current.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="current-forecast__right">
        <div id="map"></div>
      </div>
    </section>
  `;

  weatherDetailsContentEl.innerHTML = currentForecast;
};
