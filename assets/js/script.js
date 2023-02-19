// 1. landing page with nav bar, left side link to high scores, right side timer
// 2. maybe some picture in the middle, under button to start the quiz
// 3. questions are displayed and 4 buttons with answers
// 4. check submitted answer
// 4.1 if answered correctly add point, next question
// 4.2 if answered wrong substract 10 sec from timer, go to another question
// 4.3 after each answer show if was correct or wrong 
// 5. after quiz show score, textbox to save initials
// 6. highscores page shows initials and score in the list

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
var answerResult = document.createElement("section"); // section to show result of the answer

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

//
var timer = 75;
var questionIndex = 0;
var tempArray= [];
var points = 0;

// -------------------- END OF DECLARATIONS ----------------------------

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

    mainContentEl.appendChild(answerResult);
    answerResult.setAttribute("id", "answer-result");

    // Not sure if I need that part
    // firstAnswerBtnEl.setAttribute("id", "btn-answer-1");
    // secondAnswerBtnEl.setAttribute("id", "btn-answer-2");
    // thirdAnswerBtnEl.setAttribute("id", "btn-answer-2");
    // fourthAnswerBtnEl.setAttribute("id", "btn-answer-4");
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

    if(bln) answerResult.textContent = isCorrect;
    else answerResult.textContent = isWrong;
};

// Check if answer is correct or not
function checkAnswer(answer) {
    console.log(answer);
    if(answer == questions[questionIndex + 1][0]) {
        renderToShowResult(true);
        return true;
    } else {
        renderToShowResult(false);
        return false;
    };
};

// --------------------------- MAIN GAME -------------------------------
function startQuiz() {
    renderPageToDisplayQuizElements();
    if(questionIndex < questions.length) renderToShowAnswers();
    console.log("len: " + questions.length);
    var userAnswer = null;
    var timeLeft = timer;
    timerEl.textContent = timeLeft;

    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        console.log(timeLeft);

        // Listen buttons, if clicked check if the answer is correct
        firstAnswerBtnEl.addEventListener("click", function() { userAnswer = tempArray[0] });
        secondAnswerBtnEl.addEventListener("click", function() { userAnswer = tempArray[1] });
        thirdAnswerBtnEl.addEventListener("click", function () { userAnswer = tempArray[2] });
        fourthAnswerBtnEl.addEventListener("click", function() { userAnswer = tempArray[3] });

        if(userAnswer !== null) {
            if(checkAnswer(userAnswer)) {
                userAnswer = null;
                points += 5;
                questionIndex++;
            } else {
                timeLeft -= 10;
                timerEl.textContent = timeLeft;
                userAnswer = null;
            };
        };

        if( timeLeft == 0) {
            clearInterval(timeInterval);
            //end of quiz
        }
    }, 1000);
};

btnStartEl.addEventListener("click", startQuiz);