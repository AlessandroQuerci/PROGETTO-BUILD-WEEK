const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");
const questionCounter = document.querySelector(".ansCounter");
const btnQuestion = document.getElementById("questionBtn");
const question = document.querySelector(".questions");
const firstTwoAnswer = document.getElementsByClassName("firstTwo")[0];
const secondTwoAnswer = document.getElementsByClassName("secondTwo")[0];
const firstTwoContainer = document.getElementsByClassName("firstTwo");
const secondTwoContainer = document.getElementsByClassName("secondTwo");
const counterAnswer = document.getElementsByClassName("ansCounter");
const buttonAnswer = document.querySelector(".answers button");
const totalQuestions = questions.length;
let alertShown = false;
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let selectedButton = null;
let timerInterval;
const totalTime = 60; // Tempo totale
let timeRemaining = 60; // Tempo rimanente in secondi

const updateTimer = () => {
  // Aggiorna il testo del timer

  // Calcola la percentuale del tempo rimanente
  const percentage = timeRemaining / totalTime;
  // Aggiorna il grafico circolare
  progressElement.style.strokeDasharray = `${percentage * 100} ${100 - percentage * 100} `;
  timerElement.innerText = timeRemaining;
  if (timeRemaining > 0) {
    timeRemaining--;
  } else {
    clearInterval(timerInterval); // Ferma il timer una volta finito
    console.log(currentQuestionIndex);
    console.log(totalQuestions - 1);
    console.log(currentQuestionIndex < totalQuestions - 1);
    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion(); // Carica la prossima domanda automaticamente
    } else {
      // Se non ci sono altre domande, vai ai risultati
      window.location.href = "./resultspage-index.html";
    }
  }
};

const startTimer = () => {
  clearInterval(timerInterval);
  timeRemaining = totalTime;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
};

function loadQuestion() {
  timerElement.innerHTML = "";
  firstTwoAnswer.innerHTML = "";
  secondTwoAnswer.innerHTML = "";
  const currentQuestion = questions[currentQuestionIndex];
  question.textContent = currentQuestion.question;

  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(allAnswers);

  for (let i = 0; i < allAnswers.length; i++) {
    const btnAnswer = document.createElement("button");

    const answerText = document.createElement("span");
    answerText.classList.add("noopacityText");
    answerText.textContent = allAnswers[i];
    btnAnswer.appendChild(answerText);

    if (i < 2) {
      firstTwoAnswer.appendChild(btnAnswer);
    } else {
      secondTwoAnswer.appendChild(btnAnswer);
    }

    btnAnswer.addEventListener("click", function () {
      if (selectedButton) {
        selectedButton.id = "";
      }
      selectedAnswer = allAnswers[i];
      selectedButton = btnAnswer;
      btnAnswer.id = "selected";
    });
  }

  questionCounter.textContent = `QUESTION ${currentQuestionIndex + 1}/${totalQuestions}`;
  startTimer();
  return;
}

function nextQuestion() {
  if (!selectedAnswer) {
    if (!alertShown) {
      alert("Per favore, seleziona una risposta prima di procedere.");
      alertShown = true;
    }
    return;
  }
  alertShown = false;
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correct_answer) {
    userScore++;
    localStorage.setItem("userScore", userScore);
  }

  selectedAnswer = null;
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    loadQuestion();
  } else {
    const finalButton = document.querySelector("#questionCount button");
    finalButton.innerHTML = "RISULTATI";

    finalButton.addEventListener("click", function () {
      window.location.href = "./resultspage-index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
  const nextButton = document.querySelector("#questionCount button");
  nextButton.addEventListener("click", nextQuestion);
});
