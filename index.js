const input = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
outputText.addEventListener('click', () => {
  outputText.select();
  document.execCommand("copy");
  alert("Texto copiado al portapapeles");
})

let inputText = input.value;
input.addEventListener('keyup', () => {
  inputText = input.value;
  outputText.value = inputText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/a|e|i|o|u/gi, 'i');
})
