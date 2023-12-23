import {
  EVENT_CLICK,
  weatherDetailsContentEl,
} from '../../common';

const clickHandler = (event) => {
  const THIS = event.target.closest('[data-jsx-btn-action="reload"]');

  event.preventDefault();

  if (!THIS) return;

  window.location.reload();
};

weatherDetailsContentEl.addEventListener(EVENT_CLICK, clickHandler);

export default clickHandler;
