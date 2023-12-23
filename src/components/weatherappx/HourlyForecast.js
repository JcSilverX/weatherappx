import {
  ICONS_MAP,
  dateTimeFormatter,
  elementFromHtml,
  state,
  toCapitalize,
  weatherDetailsContentEl,
} from '../../common';

export const parseHourlyForecast = () => {
  // horly
  const {
    time: hour,
    temperature_2m: temperature,
    weather_code: weatherCode,
    is_day: isDay,
  } = state.hourlyForecast;

  // daily
  const {
    sunrise,
    sunset,
  } = state.dailyForecast;

  // merge arrays
  const timeList = hour.concat(sunrise, sunset).sort();
  const daylight = sunrise.concat(sunset).sort();

  const result = timeList.filter((hr) => daylight.includes(hr));

  const indexes = timeList.map((_, index) => timeList.indexOf(result[index]))
    .filter((index) => index !== -1);

  return timeList.map((time, index) => {
    if ((index % 2) === 0) {
      weatherCode.splice(indexes[index], 1, 150);
      temperature.splice(indexes[index], 1, 150);
    } else {
      weatherCode.splice(indexes[index], 1, 151);
      temperature.splice(indexes[index], 1, 151);
    }

    return {
      timestamp: time * 1000,
      weatherCode: weatherCode[index],
      temperature: Math.round(temperature[index]),
      isDay: isDay[index],
    };
  }).filter(({ timestamp }) => timestamp >= state.currentForecast.time * 1000);
};

export const renderHourlyForecast = (hourly) => {
  const hourlyForecastEl = elementFromHtml('<section class="hourly-forecast"></section>');
  const secondHeading = elementFromHtml('<h2 class="second-heading">HOURLY FORECAST</h2>');
  const hourlyForecastContentEl = elementFromHtml('<div class="hourly-forecast__content"></div>');

  weatherDetailsContentEl.insertAdjacentElement('beforeend', hourlyForecastEl);
  hourlyForecastEl.insertAdjacentElement('beforeend', secondHeading);
  hourlyForecastEl.insertAdjacentElement('beforeend', hourlyForecastContentEl);

  hourly.slice(0, 25).forEach((hour) => {
    const hr = `
      <div class="card">
        <div class="card__header">
          ${dateTimeFormatter({ timeStyle: 'short', timeZone: hour.timezone }, hour.timestamp)}
        </div>
        <div class="card__body">
          <img src="https://raw.githubusercontent.com/JcSilverX/icons-jsx/main/weather/${ICONS_MAP.get(hour.weatherCode)}.png" alt="" width="20" height="20" />
        </div>
        <div class="card__footer">
          ${(hour.temperature === 150 || hour.temperature === 151) ? toCapitalize(ICONS_MAP.get(hour.weatherCode)) : `${hour.temperature}&deg;`}
        </div>
      </div>
    `;

    hourlyForecastContentEl.insertAdjacentHTML('beforeend', hr);
  });
};
