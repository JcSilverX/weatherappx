import {
  errorTextEl,
} from '../../common';

const renderError = (message = 'Something went wrong') => {
  errorTextEl.textContent = message;
};

export default renderError;
