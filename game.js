// OBJECTIVE 1: Press any key to start game.(DONE)
// OBJECTIVE 2: Randomly flash a button. (DONE)
// OBJECTIVE 3: Play sound of corresponding color. (DONE)
// OBJECTIVE 4: Store the randomly flashed button.(DONE)
// OBJECTIVE 5: Level 1.(DONE)
// OBJECTIVE 6: Wait for user's click. User will click the stored button. (If user clicks wrong button, game over).
// OBJECTIVE 7: Level++.
// OBJECTIVE 8: Randomly flash another button, store that button also.
// OBJECTIVE 9: Wait for user's click. User will click all the stored buttons in sequence. (If user clicks wrong button, game over).
// OBJECTIVE 10: Level++.
//---------------------------------------------------------------------------------------------------------------------------------

$(document).keydown(begin);

function begin() {

  if (event.key === " ") {
    console.log("begin() enter");
    startGame();
  }

  // console.log(event.key);
}

var buttons = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var userSequence = [];
var level = 1;

function startGame() {
    console.log("startGame() enter");
    $("h1").text("Level " + level);
    var randomIndex = Math.floor(Math.random() * 4);
    flashButtons(randomIndex);
    // alert("hello");

}

function flashButtons(randomIndex) {
  console.log("flashButtons() enter");
  var buttonColor = buttons[randomIndex];
  $("." + buttonColor).fadeOut(100).fadeIn(100);
  playSound(buttonColor);
  console.log("gameSequence pushed: " + gameSequence);
  // console.log(sequence);
}

function playSound(buttonColor) {
  console.log("playSound() enter");
  var audio = new Audio ("sounds/" + buttonColor + ".mp3");
  audio.play();
}

$(".btn").click(checkAndProceed);

function checkAndProceed() {
  console.log("checkAndProceed() enter");
  var userClickedButton = $(this).attr("id");
  playSound(userClickedButton);
  $("." + userClickedButton).addClass("pressed");
  setTimeout(function () { $("." + userClickedButton).removeClass("pressed")}, 100);
  userSequence.push(userClickedButton);
  
  for (var i = 0 ; i < level ; i++) {
    if (userSequence[i] === gameSequence[i]){
      startGame();
    }
  }


  console.log("userClickedButton: " + userClickedButton);
  if (userClickedButton === gameSequence[level-1]) {
    level++;
    console.log("level++");
    startGame();
  }

}
