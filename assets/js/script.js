let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let int = null;
let startTime;
let elapsedTime = 0;
let running = false;
let lapNumber = 0;
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

document.getElementById("start-timer").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
  clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timeRef.innerHTML = "00 : 00 : 00 : 000 ";
});

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
function addLap() {
  if (running) {
    if (lapNumber < 10) {
      lapNumber++;
      let lapTime = formatTime(Date.now() - startTime + elapsedTime);
      let lapElement = document.createElement("li");
      lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
      lapsList.appendChild(lapElement);
    } else {
      alert("Maximum of 10 laps reached.");
    }
  }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);

updateDisplay(elapsedTime);
