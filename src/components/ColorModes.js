const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
  if (theme === 'auto') {
    document.documentElement.setAttribute('data-jsx-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  } else {
    document.documentElement.setAttribute('data-jsx-theme', theme);
  }
};

setTheme(getPreferredTheme());

const showActiveTheme = (theme, focus = false) => {
  const themeSwitcher = document.querySelector('#jsx-theme');

  if (!themeSwitcher) {
    return;
  }

  const activeThemeIcon = document.querySelector('.theme__icon--active use');
  const btnToActive = document.querySelector(`[data-jsx-theme-value="${theme}"]`);
  const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');

  document.querySelectorAll('[data-jsx-theme-value]')
    .forEach((element) => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

  btnToActive.classList.add('active');
  btnToActive.setAttribute('aria-pressed', 'true');
  activeThemeIcon.setAttribute('href', svgOfActiveBtn);

  if (focus) {
    themeSwitcher.focus();
  }
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme();
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme());
  }
});

const clickHandler = (event) => {
  const toggle = event.target.closest('[data-jsx-theme-value]');
  const theme = toggle.getAttribute('data-jsx-theme-value');

  setStoredTheme(theme);
  setTheme(theme);
  showActiveTheme(theme, true);
};

window.addEventListener('DOMContentLoaded', () => {
  showActiveTheme(getPreferredTheme());

  document.querySelectorAll('[data-jsx-theme-value]')
    .forEach((toggle) => {
      toggle.addEventListener('click', clickHandler);
    });
});
