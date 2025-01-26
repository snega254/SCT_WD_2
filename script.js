// Timer Variables
let timerInterval;
let elapsedTime = 0; // in milliseconds
let isRunning = false;

// DOM Elements
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

// Format Time Helper Function
function formatTime(ms) {
  const hours = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(ms % 1000).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update Timer Display
function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Start Timer
function startTimer() {
  if (!isRunning) {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimerDisplay();
    }, 10); // Update every 10ms for precision
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

// Stop Timer
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
}

// Reset Timer
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTimerDisplay();
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
  lapsContainer.innerHTML = "";
}

// Record Lap
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement("p");
  lapElement.textContent = `Lap: ${lapTime}`;
  lapsContainer.appendChild(lapElement);
}

// Event Listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
