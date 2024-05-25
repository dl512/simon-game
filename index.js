var color = ["green", "red", "yellow", "blue"];
var currentLevel = 0;
var correctAnswer;
var yourAnswer;
var gameOn = false;

startGame();

$(".btn").on("click", function(event) {
    var buttonID = parseInt($(event.target).attr('id'));
    animation(buttonID);
    playSound(color[buttonID - 1]);
    yourAnswer.push(buttonID);
    checkAnswer(yourAnswer, correctAnswer);
})

function startGame(){
    $("html").on("keydown", function() {
        if (!gameOn) {
            correctAnswer = [];
            gameOn = true;
            nextLevel();    
        }
    })    
}

function nextLevel(){
    currentLevel++;

    setTimeout(function() {
        $("h1").text("Level " + currentLevel);
    }, 500)

    randomNum = generateRandomNumber();
    setTimeout(function() {
        animation(randomNum);
        playSound(color[randomNum - 1]);
    }, 1000)
    correctAnswer.push(randomNum);

    yourAnswer = []
}

function resetLevel(){
    $("h1").text("Game Over. Press Any Key to Restart.");
    gameOn = false;
    currentLevel = 0;
    startGame();
}

function checkAnswer(yourAnswer, correctAnswer){
    var currentPosition = yourAnswer.length - 1;
    if ((yourAnswer.length == correctAnswer.length) && (yourAnswer[currentPosition] == correctAnswer[currentPosition])){
        nextLevel();
    } else if ((yourAnswer.length <= correctAnswer.length) && (yourAnswer[currentPosition] != correctAnswer[currentPosition])){
        playSound("wrong");
        resetLevel();
    }
}

function generateRandomNumber(){
    return Math.floor(Math.random() * 4) + 1;
}

function animation(ID){
    $("#"+ID).fadeOut(50).fadeIn(50);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

