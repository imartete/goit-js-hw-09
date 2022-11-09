const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

stopButton.disabled = true;

let switcherId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function switchBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', event => {
  switcherId = setInterval(switchBodyColor, 1000);
  switchBodyColor();
  event.target.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', event => {
  clearInterval(switcherId);
  event.target.disabled = true;
  startButton.disabled = false;
});
