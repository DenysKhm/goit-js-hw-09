import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
const timer = document.querySelector(".timer");

timer.style.display = "flex";
timer.style.gap = "30px";
timer.style.marginTop = "30px";

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		if (Date.now() > selectedDates[0].getTime()) {
			Notify.failure("Please choose a date in the future");
			addAttributeDisabled(startBtn, true);
			return;
		}
		addAttributeDisabled(startBtn, false);
	},
};

const data = flatpickr(input, options);
let intervalId;

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

startBtn.addEventListener("click", () => {
	addAttributeDisabled(startBtn, true);

	intervalId = setInterval(() => {
		const timeDelta = data.selectedDates[0].getTime() - Date.now();

		if (timeDelta <= 0) {
			clearInterval(intervalId);
			return;
		}

		const delta = convertMs(timeDelta);

		changeTextContent(dataDays, delta, "days");
		changeTextContent(dataHours, delta, "hours");
		changeTextContent(dataMinutes, delta, "minutes");
		changeTextContent(dataSeconds, delta, "seconds");

		console.log(delta);
	}, 1000);
});

function addAttributeDisabled(elem, value) {
	elem.disabled = value;
}

function addLeadingZero(value) {
	return String(value).padStart(2, "0");
}

function changeTextContent(elem, obj, units) {
	elem.textContent = addLeadingZero(obj[units]);
	console.log(obj[units]);
}
