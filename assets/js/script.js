// --------------------- DECLARATIONS -----------------------
// Declare all DOM attributes
var btnStartEl = document.querySelector("#btn-start");
var pageHeaderEl = document.querySelector("#page-title");
var welcomeContentEl = document.querySelector("#welcome-content")
var mainContentEl = document.querySelector("#main-content");
var timerEl = document.querySelector("#timer");

// Declare and create list elements used for answers
var listEl = document.createElement("ul");
var firstAnswerEl = document.createElement("li");
var secondAnswerEl = document.createElement("li");
var thirdAnswerEl = document.createElement("li");
var fourthAnswerEl = document.createElement("li");
var firstAnswerBtnEl = document.createElement("button");
var secondAnswerBtnEl = document.createElement("button");
var thirdAnswerBtnEl = document.createElement("button");
var fourthAnswerBtnEl = document.createElement("button");
var answerResultEl = document.createElement("section"); // section to show result of the answer
var resultPageEl = document.createElement("section");
var resultPageLinksEl = document.createElement("section");
var saveScoreEl = document.createElement("div");
var saveScoreInputEl = document.createElement("input");
var saveScoreBtnEl = document.createElement("button");

// Set attributes
saveScoreEl.setAttribute("id","save-score-content")
saveScoreBtnEl.setAttribute("style","height: 18px")
answerResultEl.setAttribute("id", "answer-result");

// Questions stored in first array
// First answer from array always correct one
var questions = [
    ["question1", "question2", "question3", "question4", "question5"],
    ["answer1", "answer2", "answer3", "answer4"], // answers to question 1
    ["answer1", "answer2", "answer3", "answer4"], // answers to question 2
    ["answer1", "answer2", "answer3", "answer4"], // answers to question 3
    ["answer1", "answer2", "answer3", "answer4"], // answers to question 4
    ["answer1", "answer2", "answer3", "answer4"], // answers to question 5
];

// var
var timer = 75;
var questionIndex = 0;
var tempArray= [];
var points = 0;
var userAnswer = null;
var timeLeft = timer;
var highscoresPageSRC = "./assets/html/highscores.html";
// ---------------------- SIDE FUNCTIONS -------------------------------

// Remove landing page and display first question and answer buttons
function renderPageToDisplayQuizElements() {

    // Remove unused elements
    welcomeContentEl.remove();
    btnStartEl.remove();

    // Create list
    mainContentEl.appendChild(listEl);

    // Add list elements
    listEl.appendChild(firstAnswerEl);
    listEl.appendChild(secondAnswerEl);
    listEl.appendChild(thirdAnswerEl);
    listEl.appendChild(fourthAnswerEl);

    // Add button to list elements
    firstAnswerEl.appendChild(firstAnswerBtnEl);
    secondAnswerEl.appendChild(secondAnswerBtnEl);
    thirdAnswerEl.appendChild(thirdAnswerBtnEl);
    fourthAnswerEl.appendChild(fourthAnswerBtnEl);

    mainContentEl.appendChild(answerResultEl);
};

// Randomly display answers on the page
function renderToShowAnswers() {
    pageHeaderEl.textContent = questions[0][questionIndex];
    tempArray = [];
    tempArray = shuffleArray(tempArray.concat(questions[questionIndex + 1]));
    firstAnswerBtnEl.textContent = tempArray[0];
    secondAnswerBtnEl.textContent = tempArray[1];
    thirdAnswerBtnEl.textContent = tempArray[2];
    fourthAnswerBtnEl.textContent = tempArray[3];
};

// Randomly shuffle answer array: Fisher-Yates Shuffle
function shuffleArray(arr) {
    let currentIndex = arr.length, randomIndex;

    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    };
    return arr;
};

// Display message on the page based on user answer
function renderToShowResult(bln) {
    var isCorrect = "Correct!";
    var isWrong = "Wrong!";

    if(bln) answerResultEl.textContent = isCorrect;
    else answerResultEl.textContent = isWrong;
};

// Check if answer is correct or not
function checkAnswer(answer) {
    if(answer == questions[questionIndex + 1][0]) {
        renderToShowResult(true);
        goToNextQuestion();
        return true;
    } else {
        renderToShowResult(false);
        timeLeft -= 10;
        points -= 3;
        return false;
    };
};
// Add points and go to another question
function goToNextQuestion() {
    userAnswer = null;
    points += 5;
    questionIndex++;
    if(questionIndex < questions.length) renderToShowAnswers();
    if(questionIndex === questions.length - 1) {
        timeLeft = 0;
        endOfQuiz();
    };
};

// remove elements to display result page
function endOfQuiz() {
    listEl.remove();
    answerResultEl.remove();
    pageHeaderEl.textContent = "All done!";
    mainContentEl.appendChild(resultPageEl).setAttribute("id", "result-content");
    resultPageEl.textContent = "Score: " + points;
    mainContentEl.appendChild(saveScoreEl).textContent = "Enter initials: ";
    saveScoreEl.appendChild(saveScoreInputEl).setAttribute("id","input-initials");
    saveScoreEl.appendChild(saveScoreBtnEl).textContent = "Submit";
};

// --------------------------- MAIN GAME -------------------------------
function startQuiz() {
    renderPageToDisplayQuizElements();
    renderToShowAnswers();

    timerEl.textContent = timeLeft;

    var timeInterval = setInterval(function() { // ---------- INSIDE TIMER
        timeLeft--;
        timerEl.textContent = timeLeft;

        if(timeLeft < 1) {
            clearInterval(timeInterval);
            timerEl.textContent = "";
            endOfQuiz();
        };
    }, 1000); // --------------------- OUTSIDE TIMER
};

// Buttons actions
btnStartEl.addEventListener("click", startQuiz);
firstAnswerBtnEl.addEventListener("click", function() { userAnswer = tempArray[0]; checkAnswer(userAnswer); });
secondAnswerBtnEl.addEventListener("click", function() { userAnswer = tempArray[1]; checkAnswer(userAnswer); });
thirdAnswerBtnEl.addEventListener("click", function () { userAnswer = tempArray[2]; checkAnswer(userAnswer); });
fourthAnswerBtnEl.addEventListener("click", function() { userAnswer = tempArray[3]; checkAnswer(userAnswer); });

saveScoreBtnEl.onclick = function () {
    if(saveScoreInputEl.value.length == 0) alert("Enter your initials.");
    else {
        var storedScores = JSON.parse(localStorage.getItem("highscores"));

        if(storedScores == null) {
            var currentScore = [[saveScoreInputEl.value, points]];
            storedScores = currentScore;
        } else {
            var currentScore = [saveScoreInputEl.value, points];
            storedScores.push(currentScore);
        };

        localStorage.setItem("highscores", JSON.stringify(storedScores));
        location.href = highscoresPageSRC;
    };
};
