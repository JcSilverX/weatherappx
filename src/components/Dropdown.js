/* eslint-disable no-underscore-dangle */
const Default = {
  autoClose: true,
  keyboard: true,
};

export default class Dropdown {
  constructor(element) {
    this._element = element;
    this._config = Dropdown.Default;
    this._parent = this._element.closest('.dropdown');
    this._menu = this._parent.querySelector('.dropdown-menu');

    this._addEventListeners();
  }

  // getters/setters
  static get Default() {
    return Default;
  }

  // public methods
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }

  show() {
    if (this._isShown()) {
      return;
    }

    this._element.focus();
    this._element.setAttribute('aria-expanded', true);

    this._menu.style.display = 'block';
    this._menu.classList.add('show');
    this._element.classList.add('show');
  }

  hide() {
    if (!this._isShown()) {
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element,
    };
    this._hideDropdown(relatedTarget);
  }

  // private methods
  _isShown() {
    return this._menu.classList.contains('show');
  }

  _addEventListeners() {
    this._element.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (this._config.keyboard) {
        this.hide();
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  _hideDropdown(_relatedTarget) {
    this._element.blur();
    this._element.setAttribute('aria-expanded', false);

    this._menu.classList.remove('show');
    this._menu.classList.add('hiding');

    this._menu.addEventListener('animationend', () => {
      this._menu.classList.remove('hiding');
      this._menu.style.display = 'none';
    }, { once: true });
  }

  // static methods
  static clearMenus(event) {
    if (event.button === 2 || (event.type === 'keyup' && event.key !== 'tab')) {
      return;
    }

    const openToggles = document.querySelectorAll('[data-jsx-toggle="dropdown"].show');

    openToggles.forEach((toggle) => {
      const context = new Dropdown(toggle);

      if (!context || context._config.autoClose === false) return;

      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);

      if (composedPath.includes(context._element) || !isMenuTarget
          || (context._config.autoClose === 'inside' && !isMenuTarget)
          || (context._config.autoClose === 'outside' && !isMenuTarget)) {
        return;
      }

      if (context._menu.contains(event.target) && ((event.type === 'keyup' && event.key === 'tab') || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        return;
      }

      const relatedTarget = { relatedTarget: context.element };
      if (event.type === 'click') {
        relatedTarget.clickEvent = event;
      }
      context._hideDropdown(relatedTarget);
    });
  }
}

document.addEventListener('click', Dropdown.clearMenus);

const clickHandler = (event) => {
  const THIS = event.target.closest('[data-jsx-toggle="dropdown"]');

  event.preventDefault();
  const instance = new Dropdown(THIS);
  instance.toggle();
};

document.querySelectorAll('[data-jsx-toggle="dropdown"]')
  .forEach((selector) => {
    selector.addEventListener('click', clickHandler);
  });
