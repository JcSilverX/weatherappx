import {
  ICONS_MAP,
  dateTimeFormatter,
  elementFromHtml,
  state,
  weatherDetailsContentEl,
} from '../../common';
import renderIcons from './Icons';

export const parseDailyForecast = () => {
  // daily
  const {
    time,
    weather_code: weatherCode,
    temperature_2m_max: maxTemp,
    apparent_temperature_min: minFeelsLikeTemp,
    precipitation_sum: precipitation,
  } = state.dailyForecast;

  // eslint-disable-next-line no-shadow
  return time.map((time, index) => ({
    timestamp: time * 1000,
    weatherCode: weatherCode[index],
    maxTemp: Math.round(maxTemp[index]),
    minFeelsLikeTemp: Math.round(minFeelsLikeTemp[index]),
    precipitation: Math.round(precipitation[index] * 100) / 100,
    isDay: (index === 0) ? state.currentForecast.isDay : 1,
  }));
};

export const renderDailyForecast = (daily) => {
  const dailyForecastEl = elementFromHtml('<section class="daily-forecast"></section>');
  const secondHeading = elementFromHtml('<h2 class="second-heading">HOURLY FORECAST</h2>');
  const dailyForecastListEl = elementFromHtml('<ul class="daily-forecast__list grid" style="--jsx-rows: 10; --jsx-columns: 5;"></ul>');

  weatherDetailsContentEl.insertAdjacentElement('beforeend', dailyForecastEl);
  dailyForecastEl.insertAdjacentElement('beforeend', secondHeading);
  dailyForecastEl.insertAdjacentElement('beforeend', dailyForecastListEl);

  daily.forEach((day) => {
    renderIcons(day.isDay);

    const newDay = `
      <li class="daily-forecast__item">${dateTimeFormatter({ weekday: 'long' }, day.timestamp)}</li>
      <li class="daily-forecast__item">
        <img src="https://raw.githubusercontent.com/JcSilverX/icons-jsx/main/weather/${ICONS_MAP.get(day.weatherCode)}.png" alt="" width="20" height="20" />
      </li>
      <li class="daily-forecast__item">${(day.precipitation > 0) ? `${day.precipitation}in` : ''}</li>
      <li class="daily-forecast__item">${day.maxTemp}&deg;</li>
      <li class="daily-forecast__item daily-forecast__item--min-temp">${day.minFeelsLikeTemp}&deg;</li>
    `;

    dailyForecastListEl.insertAdjacentHTML('beforeend', newDay);
  });
};
