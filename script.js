const quizData = {
    general: [
      { question: "What is the capital of France?", options: ["Paris", "Berlin", "Rome", "Madrid"], correct: "Paris" },
      { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" }
    ],
    science: [
      { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correct: "Mars" },
      { question: "What is the chemical symbol for water?", options: ["H", "O", "H2O", "HO2"], correct: "H2O" }
    ],
    programming: [
      { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "Programming Language", "Home Tool Markup", "None"], correct: "Hypertext Markup Language" },
      { question: "What is CSS used for?", options: ["Styling", "Structure", "Logic", "Database"], correct: "Styling" }
    ]
  };
  
  let currentQuestionIndex = 0;
  let currentCategory = "";
  let score = 0;
  let timerInterval; // Declare a variable to store the timer interval
  let timeLeft = 10; // Set the timer for 20 seconds per question
  
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      document.getElementById("start-section").style.display = "none";
      document.getElementById("quiz-section").style.display = "block";
      loadQuestion();
      startTimer(); // Start the timer when the quiz begins
    });
  });
  
  // Function to start the timer
  function startTimer() {
    timeLeft = 10; // Reset time for each question
    document.getElementById("time").innerText = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time").innerText = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("⏰ Time's up! Moving to the next question.");
        moveToNextQuestion();
      }
    }, 1000);
  }
  
  // Function to move to the next question
  function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentCategory].length) {
      loadQuestion();
      startTimer(); // Restart the timer for the next question
    } else {
      endQuiz();
    }
  }
  
  // Function to load a new question
  function loadQuestion() {
    const questionData = quizData[currentCategory][currentQuestionIndex];
    document.getElementById("question").innerHTML = questionData.question;
    document.getElementById("answers").innerHTML = questionData.options
      .map((option, idx) => `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`)
      .join("");
  }
  
  // Submit button event listener
  document.getElementById("submit").addEventListener("click", () => {
    clearInterval(timerInterval); // Stop the timer when the user submits
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return alert("Please select an answer!");
    const correctAnswer = quizData[currentCategory][currentQuestionIndex].correct;
    if (selected.value === correctAnswer) {
      document.getElementById("correct-sound").play();
      score++;
    } else {
      document.getElementById("incorrect-sound").play();
    }
    moveToNextQuestion(); // Move to the next question
  });
  
  // End quiz function
  function endQuiz() {
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";
    document.getElementById("final-score").innerText = `${score} / ${quizData[currentCategory].length}`;
  }
  
  // Restart button event listener
  document.getElementById("restart").addEventListener("click", () => {
    location.reload();
  });
  