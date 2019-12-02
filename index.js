const defaultTheme = {
  '--bg-color': '#232a31',
  '--text-color': '#FFF',
  '--check-left-color': '#17bebb',
  '--check-right-color': '#57bc59',
  '--check-btn-bg-color': '#474747',
  '--check-bg-color': '#2e2e2e'
};

const lightTheme = {
  '--bg-color': '#ebebeb',
  '--text-color': '#22181c',
  '--check-left-color': '#deb841',
  '--check-right-color': '#aa4465',
  '--check-btn-bg-color': '#645853',
  '--check-bg-color': '#241909'
};

const darkTheme = {
  ...defaultTheme
};

const lightOn = {
  emoji: '🌝',
  charcode: 'U+1F31D'
};
const lightOff = {
  emoji: '🌚',
  charcode: 'U+1F31A'
};

const emoji = document.getElementById('emoji');

const setTheme = theme => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  // if (emoji.innerText.codePointAt(0) === lightOff.emoji.codePointAt(0)) {
  // } else {
  // }
  // console.log(emoji.innerText);
};

/*
 value: 0 -> left
 value: 1 -> right
 */
let data = {
  switchValue: 0,
  theme: 'dark'
};
Object.freeze(data);

(() => {
  data = {
    ...JSON.parse(localStorage.getItem('data'))
  };

  if (data.theme) {
    if (data.theme === 'light') {
      setTheme(lightTheme);
      emoji.innerText = lightOff.emoji;
      // TODO: add switch condition
    } else {
      setTheme(darkTheme);
      emoji.innerText = lightOn.emoji;
      // TODO: add switch condition
    }
  } else {
    setTheme(defaultTheme);
  }
})();

const themeChanger = document.getElementById('theme-changer');
themeChanger.addEventListener('click', () => {
  if (emoji.innerText.codePointAt(0) === lightOff.emoji.codePointAt(0)) {
    // set dark theme
    setTheme(darkTheme);
    emoji.innerText = lightOn.emoji;
    data.theme = 'dark';
  } else {
    // set light theme
    setTheme(lightTheme);
    emoji.innerText = lightOff.emoji;
    data.theme = 'light';
  }
  localStorage.setItem('data', JSON.stringify(data));
});

const switcher = document.getElementById('switch');
switcher.addEventListener('click', () => {
  if (switcher.classList.contains('toggle-checked')) {
    // izda
    switcher.classList.remove('toggle-checked');
  } else {
    // dcha
    switcher.classList.add('toggle-checked');
  }
  console.log('CHANGE');
});

const input = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
outputText.addEventListener('click', () => {
  outputText.select();
  document.execCommand('copy');
  alert(`El texto '${outputText.value}' se ha copiado al portapapeles.`);
});

let inputText = input.value;
input.addEventListener('keyup', () => {
  inputText = input.value;
  outputText.value = inputText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/a|e|i|o|u/gi, 'i');
});
