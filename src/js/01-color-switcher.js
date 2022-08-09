// import throttle from "lodash.throttle";

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");

startBtn.addEventListener("click", onStart);

function onStart() {
	stopBtn.removeAttribute("disabled", "");
	startBtn.setAttribute("disabled", "");
	timerId = setInterval(() => {
		document.body.style.backgroundColor = getRandomHexColor();
	}, 1000);
}

stopBtn.addEventListener("click", onStop);

function onStop() {
	startBtn.removeAttribute("disabled", "");
	stopBtn.setAttribute("disabled", "");
	clearInterval(timerId);
}
