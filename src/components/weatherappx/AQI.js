import { AQI_LEVELS_MAP } from '../../common';
import arrayRange from './helpers/ArrayRange';
import addToMap from './helpers/Mapping';

const renderAQI = () => {
  addToMap(AQI_LEVELS_MAP, arrayRange(0, 50, 1), 'Good');
  addToMap(AQI_LEVELS_MAP, arrayRange(51, 100, 1), 'Moderate');
  addToMap(AQI_LEVELS_MAP, arrayRange(101, 200, 1), 'Unhealthy');
  addToMap(AQI_LEVELS_MAP, arrayRange(201, 300, 1), 'Very unhealthy');
  addToMap(AQI_LEVELS_MAP, arrayRange(301, 500, 1), 'Hazardous');
};

export default renderAQI;
