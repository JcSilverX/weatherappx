import {
  parseCurrentForecast,
  renderCurrentForecast,
} from './CurrentForecast';

import initMap from './GMaps';

import {
  parseHourlyForecast,
  renderHourlyForecast,
} from './HourlyForecast';
import {
  parseDailyForecast,
  renderDailyForecast,
} from './DailyForecast';

const renderWeatherDetails = () => {
  // parse current weather
  const currentForecast = parseCurrentForecast();

  // render current forecast
  renderCurrentForecast(currentForecast);

  // map
  initMap();

  // parse hourly weather
  const hourlyForecast = parseHourlyForecast();

  // render hourly forecast
  renderHourlyForecast(hourlyForecast);

  // parse daily forecats
  const dailyForecast = parseDailyForecast();

  // render daily forecast
  renderDailyForecast(dailyForecast);
};

export default renderWeatherDetails;
