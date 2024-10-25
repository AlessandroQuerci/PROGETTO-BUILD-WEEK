let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let wrongScore = 10 - userScore;
let percentualePositiva = (userScore * 100) / 10;
let percentualeNegativa = 100 - percentualePositiva;
const positivePercentage = document.getElementById("positivePercentage");
const negativePercentage = document.getElementById("negativePercentage");
const wrongOnTotal = document.getElementById("wrongOnTotal");
const rightOnTotal = document.getElementById("rightOnTotal");
const circleStroke = document.getElementById("donut-segment");
const text1 = document.getElementById("textCircle1");
const text2 = document.getElementById("textCircle2");

function pushPPercentage() {
  positivePercentage.textContent = percentualePositiva + "%";
}
pushPPercentage();
function pushNPercentage() {
  negativePercentage.textContent = percentualeNegativa + "%";
}
pushNPercentage();

function numWrong() {
  wrongOnTotal.textContent = `${wrongScore}/10 question`;
}
numWrong();
function numRight() {
  rightOnTotal.textContent = `${userScore}/10 question`;
}
numRight();

function grafPush() {
  circleStroke.style.strokeDasharray = `${percentualePositiva} ${percentualeNegativa} `;
}
grafPush();

function textPush() {
  if (userScore < 6) {
    text1.textContent = "Oh, No! Damn";
    text2.textContent = "You didn't passed the exam.";
  } else {
    text1.textContent = "Congratulations!";
    text2.textContent = "You passed the exam.";
  }
}
textPush();
