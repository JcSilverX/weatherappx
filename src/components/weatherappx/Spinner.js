import {
  spinnerSearchEl,
  spinnerWeatherDetails,
} from '../../common';

const renderSpinner = (whichSpinner) => {
  const spinnerEl = (whichSpinner === 'search') ? spinnerSearchEl : spinnerWeatherDetails;
  spinnerEl.classList.toggle('visually-hidden');
};

export default renderSpinner;
