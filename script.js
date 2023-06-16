var questions = {
    Qb1: [
      {
        question: "What is the formula of water?",
        options: ["Co2", "HCOOH", "H2O", "HCL"],
        answer: "H2O",
        timeLimit: 20
      },
      {
        question: "Who is the king of acids?",
        options: ["HCL", "H2SO4", "KMO4", "H2O"],
        answer: "H2SO4",
        timeLimit: 20
      },
      {
        question: "Which of these is a Fruit?",
        options: ["Apple", "Carrot", "Potato", "Tomato"],
        answer: "Apple",
        timeLimit: 10
      },
      {
        question: "who's is the pm of india?",
        options: ["Rahul Gandhi", "Amit shah", "N Modi", "Mayawati"],
        answer: "N Modi",
        timeLimit: 10
      },
      {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi",
        timeLimit: 15
      },
      {
        question: "What is the capital of France?",
        options: ["Paris", "Singapore", "California", "Italy"],
        answer: "Paris",
        timeLimit: 10
      },
      {
        question: "An angle whose value is 90 is known as?",
        options: ["Right Angle", "Complete Angle", "Acute Angle", "Obtuse Angle"],
        answer: "Right Angle",
        timeLimit: 15
      },
      // Add more Qb1 questions
    ],
    Qb2: [
      {
        question: "What is 2+2?",
        options: ["6", "4", "22", "8"],
        answer: "4",
        timeLimit: 7
      },
      {
        question: "Which of one is the Hotest Planet in our solar system?",
        options: ["Mercury", "Earth", "Moon", "Jupiter"],
        answer: "Mercury",
        timeLimit: 20
      },
      {
        question: "Which one of the Cleanest City in India?",
        options: ["Indore", "Hyderabad", "Delhi", "Chandigarh"],
        answer: "Indore",
        timeLimit: 15
      },
      // Add more Qb2 questions
    ],
    Qb3: [
      {
        question: "What is the formula of Hydrochloric acid?",
        options: ["H2O", "KMNO4", "HCL", "H2SO4"],
        answer: "HCL",
        timeLimit: 15
      },
      {
        question: "What is the formula of Potassium Chloride?",
        options: ["KCL", "KCL2", "K2SO4", "KNO3"],
        answer: "KCL",
        timeLimit: 15
      },
      {
        question: "What is Ek aur Ek?",
        options: ["1", "2", "11", "0"],
        answer: "11",
        timeLimit: 10
      },
      // Add more Qb3 questions
    ]
  };
  var Qb1Questions = 5;
  var Qb2Questions = 3;
  var Qb3Questions = 2;
  var totalQuestions = Qb1Questions + Qb2Questions + Qb3Questions;
  var selectedQuestions = [];
  var currentQuestionIndex = 0;
  var totalCorrect = 0;
  var totalWrong = 0;
  var totalSkipped = 0;
  var totalSortSkipped = 0;
  var totalAttempted = 0;
  var totalTimeLimit = 120;
  var currentQuestionTimeLimit = 0;
  var quizTimer;
  var questionTimer;
  var questionElement = document.getElementById("question");
  var optionsElement = document.getElementById("options");
  var questionTimerElement = document.getElementById("questiontime");
  var quiztimers = document.getElementById("timer");
  var skipButton = document.getElementById("skip-button");
  var nextButton = document.getElementById("next-button");
  var submitButton = document.getElementById("submit-button");
  var resultContainer = document.getElementById("result-container");

  // Function to shuffle an array
  function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  // Generate the quiz
  function createquiz() {
    var Qb1QuestionsArray = shuffleArray(questions.Qb1).slice(0, Qb1Questions);
    var Qb2QuestionsArray = shuffleArray(questions.Qb2).slice(0, Qb2Questions);
    var Qb3QuestionsArray = shuffleArray(questions.Qb3).slice(0, Qb3Questions);
    selectedQuestions = Qb1QuestionsArray.concat(Qb2QuestionsArray, Qb3QuestionsArray);
    selectedQuestions = shuffleArray(selectedQuestions);
  }
  // Display the current question
  function displayquestion() {
    var currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    var shuffledOptions = shuffleArray(currentQuestion.options);
    var optionsHTML = [];
    shuffledOptions.forEach(function (option) {
      optionsHTML += "<input type='radio' name='options' value='" + option + "'>" + option + "<br><br>";
    });
    optionsElement.innerHTML = optionsHTML;
    startQuestionTimer(currentQuestion.timeLimit);
    if (currentQuestionIndex === 0) {
      skipButton.disabled = false;
    }
    else {
      skipButton.disabled = false;
    }
    if (currentQuestionIndex === totalQuestions - 1) {
      nextButton.style.display = "none";
      //skipButton.style.display = "none";
      submitButton.style.display = "inline-block";
    }
    else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }
  // Start the question timer
  function startQuestionTimer(timeLimit) {
    clearInterval(questionTimer);
    var timeRemaining = timeLimit;
    nextButton.disabled = true;
    submitButton.disabled = true;
    questionTimerElement.textContent = " Question Time Left => " + timeRemaining + "s";
    questionTimer = setInterval(function () {
      timeRemaining--;
      questionTimerElement.textContent = "Question Time Left => " + timeRemaining + "s";
      if (timeRemaining <= 0) {
        clearInterval(questionTimer);
        //totalSkipped++;
        nextbtn();
        totalSortSkipped++;
      }
    }, 1000);
  }
  function quiztimeS() {
    var quizTimerElement = document.getElementById("quiztime");
    var timeRemaining = totalTimeLimit;
    function updateTime() {
      if (timeRemaining <= 0) {
        clearInterval(quizTimer);
        submitquiz();
      }
      else {
        quizTimerElement.innerHTML = "Quiz Over in  " + timeRemaining + " seconds";
        timeRemaining--;
      }
    }
    var quizTimer = setInterval(updateTime, 1000);
  }
  // Select an option
  function chooseoption() {
    nextButton.disabled = false;
    submitButton.disabled = false;
  }
  // Skip the current question
  function skipquestion() {
    totalSkipped++;
    nextbtn();
  }
  // Move to the next question
  function nextQuestion() {
    nextbtn();
  }
  // Handle the next question or end the quiz
  function nextbtn() {
    clearInterval(questionTimer);
    var selectedOption = document.querySelector("input[name='options']:checked");
    if (selectedOption) {
      if (selectedOption.value === selectedQuestions[currentQuestionIndex].answer) {
        totalAttempted++;
        totalCorrect++;
      }
      else {
        totalAttempted++
        totalWrong++;
      }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
      displayquestion();
    }
    else {
      submitquiz();
    }
  }
  // Submit the quiz
  function submitquiz() {
    clearInterval(quizTimer);
    var scorePercentage = (totalCorrect / totalQuestions) * 100;
    var accuracy = scorePercentage.toFixed(2) + "%";
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    questionTimerElement.style.display = "none";
    skipButton.style.display = "none";
    nextButton.style.display = "none";
    quiztimers.style.display = "none";
    submitButton.style.display = "none";
    resultContainer.style.display = "block";
    // Calculate accuracy
    var accuracy = (totalCorrect / totalQuestions) * 100 || 0;
    var totalScore = totalCorrect + " Out of " + totalQuestions;
    // Update result elements
    document.getElementById("total-questions").textContent = totalQuestions;
    document.getElementById("total-correct").textContent = totalCorrect;
    document.getElementById("total-wrong").textContent = totalWrong;
    document.getElementById("total-skipped").textContent = totalSkipped;
    document.getElementById("total-sort").textContent = totalSortSkipped;
    document.getElementById("total-attempted").textContent = totalAttempted;
    document.getElementById("total-score").textContent = totalScore;
    document.getElementById("accuracy").textContent =
      accuracy.toFixed(2) + "%";
  }
  // Event listeners
  optionsElement.addEventListener("change", chooseoption);
  skipButton.addEventListener("click", skipquestion);
  nextButton.addEventListener("click", nextQuestion);
  submitButton.addEventListener("click", submitquiz);
  // Start the quiz
  function startQuiz1() {
    home.style.display = "none";
    quizbox.style.display = "block";
    createquiz();
    displayquestion();
    quiztimeS();
  }
