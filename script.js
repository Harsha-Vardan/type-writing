'use strict';
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

const setupDiv=document.getElementById("setup");
const gameDiv = document.getElementById("game");
const resultDiv = document.getElementById("result");
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.getElementById("restart-btn");
const timeSelect = document.getElementById("time-select");
const textDisplay = document.getElementById("text-display");
const inputArea=document.getElementById("input-area");
const timerSpan = document.getElementById("timer");
const cpsSpan = document.getElementById("cps");
const wpmSpan = document.getElementById("wpm");
const scoreSpan = document.getElementById("score");
const finalScore = document.getElementById("final-score");

let currentSentence='';
let sentenceindex=0;
let charIndex=0;
let totalChars=0;
let totalWords=0;
let correctChars=0;
let CorrectWords=0;
let timer=null;
let timeLimit=60;
let timeLeft=0;
let startted=false;
let startTime=0;
let latsCharTime=0;

function getRandomSentence(){
    return sentences[Math.floor(Math.random()*sentences.length)];
}
function updateTextDisplay(){
    const before = currentSentence.slice(0,charIndex);
    const current = currentSentence[charIndex] || "";
    const after = currentSentence.slice(charIndex+1);
    textDisplay.innerHTML=`<span>${before.replace(/ /g,"&nbsp;")}</span>` +
    `<span class="highlight">${current=== " " ? "&nbsp;" : current}</span>` +
    `<span>${after.replace(/ /g, "&nbsp;")}</span>`;
}
function nextSentence(){
    currentSentence = getRandomSentence();
    charIndex=0;
    updateTextDisplay();
    inputArea.value='';
}
