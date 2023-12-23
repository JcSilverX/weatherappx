import { ICONS_MAP, ICON_DESCRIPTION_MAP } from '../../common';
import addToMap from './helpers/Mapping';

const renderIcons = (isDay) => {
  if (isDay) {
    addToMap(ICONS_MAP, [0, 1], 'sunny');
    addToMap(ICONS_MAP, [2], 'partlySunny');
    addToMap(ICONS_MAP, [51, 53, 55, 56, 57], 'drizzle');

    // Icons Description (Day)
    addToMap(ICON_DESCRIPTION_MAP, [0, 1], 'Clear / Mostly clear');
    addToMap(ICON_DESCRIPTION_MAP, [2], 'Partly cloudy');
    addToMap(ICON_DESCRIPTION_MAP, [51, 53, 55, 56, 57], 'Drizzle / Freezing drizzle');
  } else {
    addToMap(ICONS_MAP, [0, 1], 'clearNight');
    addToMap(ICONS_MAP, [2], 'partlyCloudyNight');
    addToMap(ICONS_MAP, [51, 53, 55, 56, 57], 'nightDrizzle');

    // Icons Description (Night)
    addToMap(ICON_DESCRIPTION_MAP, [0, 1], 'Clear / Mostly Clear (night)');
    addToMap(ICON_DESCRIPTION_MAP, [2], 'Partly cloudy (night)');
    addToMap(ICON_DESCRIPTION_MAP, [51, 53, 55, 56, 57], 'Drizzle (night)');
  }

  addToMap(ICONS_MAP, [3], 'cloudy');
  addToMap(ICONS_MAP, [45, 48], 'fog');
  addToMap(ICONS_MAP, [61, 63, 80, 81], 'rain');
  addToMap(ICONS_MAP, [65, 82], 'heavyRain');
  addToMap(ICONS_MAP, [66, 67], 'Sleet');
  addToMap(ICONS_MAP, [71, 73, 77, 85], 'snow');
  addToMap(ICONS_MAP, [75, 86], 'scatteredSnow');
  addToMap(ICONS_MAP, [95, 96, 99], 'thunderBolt');

  addToMap(ICON_DESCRIPTION_MAP, [3], 'Cloudy');
  addToMap(ICON_DESCRIPTION_MAP, [45, 48], 'Fog');
  addToMap(ICON_DESCRIPTION_MAP, [61, 63, 80, 81], 'Rain');
  addToMap(ICON_DESCRIPTION_MAP, [65, 82], 'Heavy rain');
  addToMap(ICON_DESCRIPTION_MAP, [66, 67], 'Freezing rain / Sleet / Wintry mix');
  addToMap(ICON_DESCRIPTION_MAP, [71, 73, 77, 85], 'Snow');
  addToMap(ICON_DESCRIPTION_MAP, [75, 86], 'Heavy snow / Blizzard');
  addToMap(ICON_DESCRIPTION_MAP, [95, 96, 99], 'Thunderstorm');

  // Extras
  addToMap(ICONS_MAP, [150], 'sunrise');
  addToMap(ICONS_MAP, [151], 'sunset');
};

export default renderIcons;
