const defaultTheme = {
  '--bg-color': '#232a31',
  '--text-color': '#FFF',
  '--check-left-color': '#17bebb',
  '--check-right-color': '#57bc59',
  '--check-btn-bg-color': '#474747',
  '--check-bg-color': '#2e2e2e',
};

const lightTheme = {
  '--bg-color': '#ebebeb',
  '--text-color': '#22181c',
  '--check-left-color': '#deb841',
  '--check-right-color': '#aa4465',
  '--check-btn-bg-color': '#645853',
  '--check-bg-color': '#241909',
};

const darkTheme = {
  ...defaultTheme,
};

const lightOn = {
  emoji: '🌝',
  charcode: 'U+1F31D',
};
const lightOff = {
  emoji: '🌚',
  charcode: 'U+1F31A',
};

const emoji = document.getElementById('emoji');
const input = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const themeChanger = document.getElementById('theme-changer');
const switcher = document.getElementById('switch');
const DARK = 'dark';
const LIGHT = 'light';
const VICILIDIR = 'vicilidir';
const OIQ = '0iq';
const TOGGLE_CLASS = 'toggle-checked';
const DEFAULT_INPUT_TEXT = 'Hola';
let inputText = input.value;

const setTheme = (theme) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};

let data = {
  switchValue: VICILIDIR,
  theme: DARK,
  text: DEFAULT_INPUT_TEXT,
};

const vicilidirAction = (_input) => _input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/a|e|i|o|u/gi, 'i');
const oiqActoin = (_input) => _input.split('').map((l, i) => (i % 2 === 0 ? l.toLowerCase() : l.toUpperCase())).join('');
const transformText = (_input) => (data.switchValue === VICILIDIR ? vicilidirAction(_input) : oiqActoin(_input));

Object.freeze(data);

(() => {
  data = {
    ...data,
    ...JSON.parse(localStorage.getItem('data')),
  };

  if (data.theme) {
    if (data.theme === LIGHT) {
      setTheme(lightTheme);
      emoji.innerText = lightOff.emoji;
    } else if (data.theme === DARK) {
      setTheme(darkTheme);
      emoji.innerText = lightOn.emoji;
    } else {
      setTheme(defaultTheme);
      emoji.innerText = lightOn.emoji;
    }
  } else {
    setTheme(defaultTheme);
  }

  if (data.switchValue) {
    if (data.switchValue === VICILIDIR) {
      switcher.classList.remove(TOGGLE_CLASS);
    } else if (data.switchValue === OIQ) {
      switcher.classList.add(TOGGLE_CLASS);
    } else {
      switcher.classList.remove(TOGGLE_CLASS);
    }
  } else {
    switcher.classList.remove(TOGGLE_CLASS);
  }

  if (data.text) {
    input.value = data.text;
    outputText.value = transformText(data.text);
  } else {
    input.value = DEFAULT_INPUT_TEXT;
    outputText.value = transformText(DEFAULT_INPUT_TEXT);
  }
})();

themeChanger.addEventListener('click', () => {
  if (emoji.innerText.codePointAt(0) === lightOff.emoji.codePointAt(0)) {
    // set dark theme
    setTheme(darkTheme);
    emoji.innerText = lightOn.emoji;
    data.theme = DARK;
  } else {
    // set light theme
    setTheme(lightTheme);
    emoji.innerText = lightOff.emoji;
    data.theme = LIGHT;
  }
  localStorage.setItem('data', JSON.stringify(data));
});

switcher.addEventListener('click', () => {
  if (switcher.classList.contains(TOGGLE_CLASS)) {
    // izda
    data.switchValue = VICILIDIR;
    switcher.classList.remove(TOGGLE_CLASS);
    outputText.value = vicilidirAction(inputText);
  } else {
    // dcha
    data.switchValue = OIQ;
    switcher.classList.add(TOGGLE_CLASS);
    outputText.value = oiqActoin(inputText);
  }
  localStorage.setItem('data', JSON.stringify(data));
});

outputText.addEventListener('click', () => {
  outputText.select();
  document.execCommand('copy');
  alert(`El texto '${outputText.value}' se ha copiado al portapapeles.`);
});

input.addEventListener('keyup', () => {
  inputText = input.value;
  outputText.value = transformText(inputText);
  data.text = inputText;
  localStorage.setItem('data', JSON.stringify(data));
});
