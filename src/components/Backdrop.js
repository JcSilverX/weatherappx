/* eslint-disable no-underscore-dangle */
import {
  reflow,
  elementFromHtml,
} from '../common';

const Default = {
  className: 'modal-backdrop',
  isAnimated: false,
  isVisible: true,
};

export default class Backdrop {
  constructor(config) {
    this._config = Object.assign(Backdrop.Default, config);
  }

  // getters/setters
  static get Default() {
    return Default;
  }

  // public methods
  show(callback) {
    if (!this._config.isVisible || this._isAppended()) {
      return;
    }

    this._element = this._appendElement();

    if (this._config.isAnimated) {
      reflow(this._element);
    }

    this._element.classList.add('show');
    callback();
  }

  hide(callback) {
    if (!this._config.isVisible || !this._isAppended()) {
      return;
    }

    this._element = this._getElement();

    this._element.classList.remove('show');

    this._element.addEventListener('transitionend', () => {
      this.dispose();
      callback();
    }, { once: true });
  }

  dispose() {
    if (!this._isAppended()) {
      return;
    }

    this._element.remove();
  }

  // private methods
  _isAppended() {
    return document.body.contains(this._getElement());
  }

  _getElement() {
    return document.querySelector(`.${this._config.className}`);
  }

  _appendElement() {
    const element = elementFromHtml(`<div class="${this._config.className}"></div>`);

    if (this._config.isAnimated) {
      element.classList.add('fade');
    }

    return document.body.insertAdjacentElement('beforeend', element);
  }

  // static methods
}
