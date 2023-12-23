/* eslint-disable no-underscore-dangle */
import {
  reflow,
  enableDismissTrigger,
} from '../common';

import Backdrop from './Backdrop';

const NAME = 'modal';

export default class Modal {
  constructor(element) {
    this._element = element;
    this._backdrop = this._initBackdrop();

    this._addEventListeners();
  }

  // getters/setters
  static get NAME() {
    return NAME;
  }

  // public methods
  toggle() {
    return !this._isShown() ? this.show() : this.hide();
  }

  show() {
    if (this._isShown()) {
      return;
    }

    document.body.classList.add('modal-open');
    document.body.classList.remove('modal-closed');
    this._backdrop.show(() => this._showElement());
  }

  hide() {
    if (!this._isShown()) {
      return;
    }
    this._element.classList.remove('show');
    this._element.blur();

    this._hideModal();
  }

  dispose() {
    this._backdrop.dispose();

    super.dispose();
  }

  // private methods
  _isShown() {
    return this._element.classList.contains('show');
  }

  _showElement() {
    this._element.style.display = 'block';
    this._element.removeAttribute('aria-hidden');

    reflow(this._element);

    this._element.classList.add('show');
    this._element.focus();
  }

  _hideModal() {
    this._element.addEventListener('transitionend', () => {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);

      this._backdrop.hide(() => {
        document.body.classList.remove('modal-open');
        document.body.classList.add('modal-closed');
      });
    }, { once: true });
  }

  // eslint-disable-next-line class-methods-use-this
  _initBackdrop() {
    return new Backdrop({
      isVisible: true,
      isAnimated: true,
    });
  }

  _addEventListeners() {
    this._element.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      this.hide();
    });
  }
}

const clickHandler = (event) => {
  const THIS = event.target.closest('[data-jsx-toggle="modal"]');
  const target = document.querySelector(THIS.dataset.jsxTarget);

  event.preventDefault();

  const instance = new Modal(target);
  instance.toggle();
};

document.querySelectorAll('[data-jsx-toggle="modal"]')
  .forEach((selector) => {
    selector.addEventListener('click', clickHandler);
  });

enableDismissTrigger(Modal);
