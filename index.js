let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let buttons = $(".btn");
let started = false;

function nextSequence () {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * buttons.length);
    let randomChosenColor = buttons[randomNumber].id;
    gamePattern.push(randomChosenColor);
    let selectedBtn = $("#"+gamePattern[gamePattern.length-1]);
    playSound(gamePattern[gamePattern.length-1]);
    $(selectedBtn).fadeOut(50).fadeIn();    
    level++;
    $("#level-title").html(`Level ${level}`);
}

$(document).keypress(function() {
    if (!started){
        $("#level-title").html("Level 1");
        nextSequence();
        started = true;
    } else {
        return;
    }
});

$(".play").click(function (){
    if (!started){
        $("#level-title").html("Level 1");
        nextSequence();
        started = true;
        $(".play").prop('disabled', true);
    } else {
        return;
    }
})

$(".btn").click(function (event){
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userClickedPattern[userClickedPattern.length-1]);
    animatePress(userChosenColor);
    checkNewAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor) {
    let curr = "#"+currentColor;
    $(curr).addClass("pressed");
    setInterval(() => {
        $(curr).removeClass("pressed")}, 100);
}

function checkNewAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key or Click 'Restart'");
        startOver();
    }
}

function playSound(soundToPlay) {
    let sound = new Audio(`sounds/${soundToPlay}.mp3`);
    sound.play();
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
    $(".play").html("Restart");
    $(".play").prop('disabled', false);
}