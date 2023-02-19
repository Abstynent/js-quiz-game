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

// Store all questions and answers, question[x][1] to be always correct answer
const questions = [
    ["question1", "answer1", "answer2", "answer3", "answer4"],
    ["question2", "answer1", "answer2", "answer3", "answer4"],
    ["question3", "answer1", "answer2", "answer3", "answer4"],
    ["question4", "answer1", "answer2", "answer3", "answer4"],
    ["question5", "answer1", "answer2", "answer3", "answer4"],
];

//
var timer = 5;
// Messages displayed after answering the questions
var isCorrect = "Correct!";
var isWrong = "Wrong!";
// -------------------- END OF DECLARATIONS ----------------------------
// Remove landing page and display first question and answer buttons
function renderPageToDisplayQuizElements() {
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
    firstAnswerEl.appendChild(firstAnswerBtnEl).textContent = questions[0][1];
    secondAnswerEl.appendChild(secondAnswerBtnEl).textContent = questions[0][2];
    thirdAnswerEl.appendChild(thirdAnswerBtnEl).textContent = questions[0][3];
    fourthAnswerEl.appendChild(fourthAnswerBtnEl).textContent = questions[0][4];

    mainContentEl.appendChild(answerResult); //.textContent = "Correct!";
    answerResult.setAttribute("id", "answer-result");
    // Not sure if I need that part
    // firstAnswerBtnEl.setAttribute("id", "btn-answer-1");
    // secondAnswerBtnEl.setAttribute("id", "btn-answer-2");
    // thirdAnswerBtnEl.setAttribute("id", "btn-answer-2");
    // fourthAnswerBtnEl.setAttribute("id", "btn-answer-4");

};

btnStartEl.addEventListener("click", function() {
    pageHeaderEl.textContent = questions[0][0];
    renderPageToDisplayQuizElements();
    var timeLeft = timer;
    timerEl.textContent = timeLeft;
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if( timeLeft == 0) {
            clearInterval(timeInterval);
            //end of quiz
        }
    }, 1000);
});