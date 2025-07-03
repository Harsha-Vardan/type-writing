'use strict';
// Typing test sentences (can be expanded or fetched from an API)
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests help improve your speed and accuracy.",
  "Practice makes perfect in every field of life.",
  "JavaScript is a versatile programming language.",
  "Artificial intelligence is shaping the future.",
  "Stay curious and keep learning new things.",
  "Consistency is the key to success.",
  "Reading books expands your knowledge and imagination.",
  "Healthy habits lead to a better lifestyle.",
  "Technology connects people around the world.",
];

const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const resultDiv = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const timeSelect = document.getElementById("time-select");
const textDisplay = document.getElementById("text-display");
const inputArea = document.getElementById("input-area");
const timerSpan = document.getElementById("timer");
const cpsSpan = document.getElementById("cps");
const wpmSpan = document.getElementById("wpm");
const scoreSpan = document.getElementById("score");
const finalScoreP = document.getElementById("final-score");
const highScoreSpan = document.getElementById("high-score");
const newHighScoreMessage = document.getElementById("new-high-score-message");

let timeLimit = 60;
let timer = null;
let timeLeft = 0;
let currentSentence = "";
let sentenceIndex = 0;
let charIndex = 0;
let totalChars = 0;
let totalWords = 0;
let correctChars = 0;
let correctWords = 0;
let started = false;
let startTime = 0;
let lastCharTime = 0;

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function updateTextDisplay() {
  // Highlight the current part being typed
  const before = currentSentence.slice(0, charIndex);
  const current = currentSentence[charIndex] || "";
  const after = currentSentence.slice(charIndex + 1);
  textDisplay.innerHTML =
    `<span>${before.replace(/ /g, "&nbsp;")}</span>` +
    `<span class="highlight">${current === " " ? "&nbsp;" : current}</span>` +
    `<span>${after.replace(/ /g, "&nbsp;")}</span>`;
}

function nextSentence() {
  currentSentence = getRandomSentence();
  charIndex = 0;
  updateTextDisplay();
  inputArea.value = "";
}

function startGame() {
  timeLimit = parseInt(timeSelect.value, 10);
  timeLeft = timeLimit;
  totalChars = 0;
  totalWords = 0;
  correctChars = 0;
  correctWords = 0;
  started = false;
  sentenceIndex = 0;
  startTime = 0;
  lastCharTime = 0;
  setupDiv.style.display = "none";
  resultDiv.style.display = "none";
  gameDiv.style.display = "";
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  nextSentence();
  updateStats();
  timerSpan.textContent = `Time: ${formatTime(timeLeft)}`;
  timer = setInterval(updateTimer, 1000);
}

function endGame() {
  clearInterval(timer);
  inputArea.disabled = true;
  gameDiv.style.display = "none";
  resultDiv.style.display = "";
  // Calculate performance score (simple formula: correct chars + 5*correct words)
  const score = correctChars + 5 * correctWords;
  finalScoreP.textContent = `CPS: ${getCPS()} | WPM: ${getWPM()} | Score: ${score}`;
  // High score logic
  const prevHigh = getHighScore();
  if (score > prevHigh) {
    setHighScore(score);
    updateHighScoreDisplay();
    newHighScoreMessage.textContent = "🎉 You achieved a NEW HIGH SCORE! 🎉";
    newHighScoreMessage.style.display = "block";
  } else {
    newHighScoreMessage.style.display = "none";
  }
}

function updateTimer() {
  timeLeft--;
  timerSpan.textContent = `Time: ${formatTime(timeLeft)}`;
  if (timeLeft <= 0) {
    endGame();
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function updateStats() {
  cpsSpan.textContent = `CPS: ${getCPS()}`;
  wpmSpan.textContent = `WPM: ${getWPM()}`;
  const score = correctChars + 5 * correctWords;
  scoreSpan.textContent = `Score: ${score}`;
}

function getCPS() {
  const elapsed = Math.max(1, timeLimit - timeLeft);
  return (correctChars / elapsed).toFixed(2);
}

function getWPM() {
  const elapsed = Math.max(1, (timeLimit - timeLeft) / 60);
  return (correctWords / elapsed).toFixed(2);
}

function getHighScore() {
  return parseInt(localStorage.getItem("typingHighScore") || "0", 10);
}

function setHighScore(score) {
  localStorage.setItem("typingHighScore", score);
}

function updateHighScoreDisplay() {
  highScoreSpan.textContent = `High Score: ${getHighScore()}`;
}

inputArea.addEventListener("input", (e) => {
  if (!started) {
    started = true;
    startTime = Date.now();
    lastCharTime = startTime;
  }
  const val = inputArea.value;
  totalChars = totalChars + 1;
  // Check char by char
  if (val[charIndex] === currentSentence[charIndex]) {
    correctChars++;
  }
  if (val === currentSentence) {
    // Check word correctness
    const inputWords = val.trim().split(/\s+/);
    const sentenceWords = currentSentence.trim().split(/\s+/);
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === sentenceWords[i]) correctWords++;
    }
    totalWords += sentenceWords.length;
    // Load next sentence
    nextSentence();
  } else {
    charIndex = val.length;
    updateTextDisplay();
  }
  updateStats();
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  setupDiv.style.display = "";
  resultDiv.style.display = "none";
  gameDiv.style.display = "none";
  newHighScoreMessage.style.display = "none";
});

// Allow pressing Enter to start/restart
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && setupDiv.style.display !== "none") {
    startGame();
  } else if (e.key === "Enter" && resultDiv.style.display !== "none") {
    setupDiv.style.display = "";
    resultDiv.style.display = "none";
    gameDiv.style.display = "none";
    newHighScoreMessage.style.display = "none";
  }
});

// On page load, show high score
updateHighScoreDisplay();
