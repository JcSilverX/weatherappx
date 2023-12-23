import {
  UV_INDEX_MAP,
} from '../../common';
import addToMap from './helpers/Mapping';

/*-
 * UV INDEX
 * A score of 1 or 2 is low, 3 to 5 is moderate,
 * 6 or 7 is high, 8 to 10 is very high, and 11 and above
 * is extreme.
 */
const renderUV = () => {
  addToMap(UV_INDEX_MAP, [0, 1, 2], 'Low');
  addToMap(UV_INDEX_MAP, [3, 4, 5], 'Moderate');
  addToMap(UV_INDEX_MAP, [6, 7], 'High');
  addToMap(UV_INDEX_MAP, [8, 9, 10], 'Very high');
  addToMap(UV_INDEX_MAP, [11], 'Extreme');
};

export default renderUV;
