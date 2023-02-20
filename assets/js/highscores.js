var goBackBtn = document.querySelector("#btn-go-back");
var clearScoresBtn = document.querySelector("#btn-clear-scores");
var listHighscoresEl = document.querySelector("#highscores-ol");

var storedScores = JSON.parse(localStorage.getItem("highscores"));

goBackBtn.onclick = function() {
    location.href = "../../index.html";
};

clearScoresBtn.onclick = function () {
    storedScores = null;
    localStorage.setItem("highscores", JSON.stringify(storedScores));
    renderHighscores();
};

function renderHighscores() {
    listHighscoresEl.innerHTML = "";
    if(storedScores === null) return;
    else storedScores = storedScores.sort((a, b) => b[1] - a[1]);

    for(var i = 0; i < storedScores.length; i++) {
        var score = storedScores[i];
        var li = document.createElement("li");
        if(i % 2 === 0) {
            li.style.backgroundColor = "lightgray";
        }
        li.textContent = storedScores[i][0] + " - " + storedScores[i][1];
        listHighscoresEl.appendChild(li);
    };
};

renderHighscores();