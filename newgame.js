let viewportWidth = $(window).width();

viewportWidth > 1025 ? $("h1").text("Click Here To Start") : $("h1").text("Tap Here To Start");
viewportWidth > 1025 ? $("span").text("Click") : $("span").text("Tap");


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 1;

// --------------------------------------------------KEYBOARD INPUT--------------------------------------------------
// $(document).keydown(start);
$(document).click(start);

function start() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomChosenColor = randomize();
  animateOnKeyPress(randomChosenColor);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

function animateOnKeyPress(randomChosenColor) {
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
}

function playSound(randomChosenColor) {
  var audio = new Audio ("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function randomize() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  return randomChosenColor;
}

// --------------------------------------------------MOUSE INPUT--------------------------------------------------
$(".btn").click(clickHandler);

function clickHandler() {
  var userChosenColor = $(this).attr("id");
  animateOnClick(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  var currentLevel = userClickedPattern.length - 1;
  check(currentLevel);
}

function animateOnClick(userChosenColor) {
  $("." + userChosenColor).addClass("pressed");
  setTimeout(function () { $("." + userChosenColor).removeClass("pressed");}, 100);
}

function startOver() {
  level = 1;
  started = false;
  gamePattern = [];
  location.reload();
}

function check(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    proceed();
  } else {
    gameOver();
  }
}

function gameOver() {
  $("body").addClass("game-over");
  var audio = new Audio ("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game Over.");
  $("#level-title").addClass("black-font");
  setTimeout(function () {
    $("body").removeClass("game-over");
    $("#level-title").removeClass("black-font");
    $("h1").text("Tap Here To Start");
    startOver();
  }, 3000);

}

function proceed() {
  if (userClickedPattern.length === gamePattern.length) {
    level++;
    setTimeout(nextSequence, 1000);
  }
}
