import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.startBtn.addEventListener('click', onStartBtnClick);
function onStartBtnClick() {
  timer.start();
}
let chooseDate = '';
let currentTime = Date.now();
refs.startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate1 = selectedDates[0];
    console.log(chooseDate1);
    chooseDate = chooseDate1.getTime();
    if (chooseDate > currentTime) {
      refs.startBtn.disabled = false;
    } else {
      return Notify.info('Please choose a date in the future');
    }
  },
};

const calendar = flatpickr('input#datetime-picker', options);

const timer = {
  intervalID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    if (chooseDate > currentTime) {
      this.isActive = true;
      this.intervalID = setInterval(() => {
        currentTime = Date.now();
        const ms = chooseDate - currentTime;
        if (ms < 0) {
          this.stop();
        } else {
          const time = convertMs(ms);
          console.log(time);
          updateClockFace(time);
        }
      }, 1000);
    }
  },
  stop() {
    clearInterval(this.intervalID);
    this.isActive = false;
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
