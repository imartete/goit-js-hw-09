import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const inputNode = document.querySelector('#datetime-picker');
const daysNode = document.querySelector('[data-days]');
const hoursNode = document.querySelector('[data-hours]');
const minutesNode = document.querySelector('[data-minutes]');
const secondsNode = document.querySelector('[data-seconds]');

startButton.disabled = true;
let selectedTimeMs, timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTimeMs = selectedDates[0].getTime();

    if (selectedTimeMs <= Date.now()) {
      startButton.disabled = true;
      alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

startButton.addEventListener('click', event => {
  if (selectedTimeMs <= Date.now()) {
    alert('Please choose a date in the future');
    event.target.disabled = true;
    return;
  }
  event.target.disabled = true;
  inputNode.disabled = true;
  timerId = setInterval(timerUpdate, 1000);
  timerUpdate();
});

function timerUpdate() {
  const { days, hours, minutes, seconds } = convertMs(
    selectedTimeMs - Date.now()
  );
  daysNode.textContent = days.toString().padStart(2, '0');
  hoursNode.textContent = hours.toString().padStart(2, '0');
  minutesNode.textContent = minutes.toString().padStart(2, '0');
  secondsNode.textContent = seconds.toString().padStart(2, '0');

  if (!days && !hours && !minutes && !seconds) {
    clearInterval(timerId);
  }
}

flatpickr(inputNode, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
