import {
  elementFromHtml,
} from '../../common';

export default class Gauge extends HTMLElement {
  static css = `
    :host {
      width: 100%;
      max-width: 10rem;
    }

    .gauge__body {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 50%;
      background: #b4c0be;
      border-top-left-radius: 100% 200%;
      border-top-right-radius: 100% 200%;
      overflow: hidden;
    }

    .gauge__fill {
      position: absolute;
      top: 100%;
      left: 0;
      width: inherit;
      height: 100%;
      background: #fad631;
      transform-origin: center top;
      transform: rotate(.25turn);
      transition: transform .2s ease-in-out;
    }

    .gauge__cover {
      position: absolute;
      width: 95%;
      height: 190%;
      border-radius: 50%;
      // background:  var(--jsx-gauge-cover-bg, #dfdfdf);
      background: var(--jsx-body-bg);
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    const body = elementFromHtml(`
        <div class="gauge__body">
            <div class="gauge__fill"></div>
            <div class="gauge__cover"></div>
        </div>
    `);

    style.innerHTML = Gauge.css;
    this.shadowRoot.append(style, body);
  }

  // getters/setters
  get percent() {
    const value = this.getAttribute('data-jsx-percent');
    if (value < 0) {
      return;
    }

    if (value > 1) {
      // eslint-disable-next-line consistent-return
      return 1;
    }

    // eslint-disable-next-line consistent-return
    return value;
  }

  set percent(value) {
    this.setAttribute('data-jsx-percent', value);
  }

  static get observedAttributes() {
    return ['data-jsx-percent'];
  }

  // public methods
  attributeChangedCallback(name) {
    if (name === 'data-jsx-percent') {
      this.shadowRoot.querySelector('.gauge__fill').style.transform = `rotate(${this.percent / 2}turn)`;
    }
  }

  // private methods

  // static methods
}

customElements.define('wx-gauge', Gauge);
