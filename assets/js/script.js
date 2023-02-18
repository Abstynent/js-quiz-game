// 1. landing page with nav bar, left side link to high scores, right side timer
// 2. maybe some picture in the middle, under button to start the quiz
// 3. questions are displayed and 4 buttons with answers
// 4. check submitted answer
// 4.1 if answered correctly add point, next question
// 4.2 if answered wrong substract 5 sec from timer, go to another question
// 4.3 after each answer show if was correct or wrong 
// 5. after quiz show score, textbox to save initials
// 6. highscores page shows initials and score in the list

// Declare all DOM attributes
var btnStartEl = document.querySelector("#btn-start");
var pageHeaderEl = document.querySelector("#page-title");
var welcomeContentEl = document.querySelector("#welcome-content")
var mainContentEl = document.querySelector("#main-content");

// Declare and create list elements used for answers
var listEl = document.createElement("ul");
var firstAnswerEl = document.createElement("li");
var secondAnswerEl = document.createElement("li");
var thirdAnswerEl = document.createElement("li");
var fourthAnswerEl = document.createElement("li");

// Store all questions and answers, question[x][1] to be always correct answer
const questions = [
    ["question1", "answer1", "answer2", "answer3", "answer4"],
    ["question2", "answer1", "answer2", "answer3", "answer4"],
    ["question3", "answer1", "answer2", "answer3", "answer4"],
    ["question4", "answer1", "answer2", "answer3", "answer4"],
    ["question5", "answer1", "answer2", "answer3", "answer4"],
];

function yetToBeNamed() {
    welcomeContentEl.remove();
    btnStartEl.remove();

    mainContentEl.appendChild(listEl);
    listEl.appendChild(firstAnswerEl).textContent = "<button>" + questions[0][1] + "</button>";
    listEl.appendChild(secondAnswerEl).textContent = questions[0][2];
    listEl.appendChild(thirdAnswerEl).textContent = questions[0][3];
    listEl.appendChild(fourthAnswerEl).textContent = questions[0][4];

    firstAnswerEl.setAttribute("id", "answer-1");
    secondAnswerEl.setAttribute("id", "answer-2");
    thirdAnswerEl.setAttribute("id", "answer-2");
    fourthAnswerEl.setAttribute("id", "answer-4");

};

btnStartEl.addEventListener("click", function() {
    pageHeaderEl.textContent = questions[0][0];
    yetToBeNamed();
});