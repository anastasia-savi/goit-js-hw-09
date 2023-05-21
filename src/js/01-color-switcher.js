const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;
buttonStart.addEventListener('click', onButttonStartClick);
buttonStop.addEventListener('click', onButttonStopClick);
buttonStop.disabled = true;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function onButttonStartClick() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function onButttonStopClick() {
  clearInterval(timerId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}
