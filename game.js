// Declare an array containing button colors
let buttonColors = ["red", "blue", "green", "yellow"];

// Initialize an empty array to store the game's pattern
let gamePattern = [];

// Initialize an empty array to store the user's clicked pattern
let userClickedPattern = [];

// Initialize a variable to track if the game has started
let started = false;

// Initialize a variable to track the current level
let level = 0;

// Event listener for a key press on the document
$(document).keydown(function () {
  // Check if the game has not started yet
  if (!started) {
    // Update the heading text with the current level
    $("#level-title").text("Level " + level);

    // Call the function to start the next sequence
    nextSequence();

    // Set the game as started
    started = true;
  }
});

// Event listener for a click on elements with class "btn"
$(".btn").click(function () {
  // Get the ID (color) of the clicked button
  let userChosenColor = this.id;

  // Add the clicked color to the user's pattern
  userClickedPattern.push(userChosenColor);

  // Play the sound associated with the clicked color
  playSound(userChosenColor);

  // Animate the clicked button to show the press effect
  animatePress(userChosenColor);

  // Check the user's answer based on the current level
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer against the game's pattern
function checkAnswer(currentLevel) {
  // Compare the color at the current level between game pattern and user pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the colors match, log "success" and continue to the next level if necessary
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      // Wait for 1 second and then call the nextSequence function to proceed to the next level
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the colors don't match, log "wrong" and handle game over
    console.log("wrong.");
    // Add the class "game-over" to the body to display the game over animation
    $("body").addClass("game-over");
    // Create an Audio object to play the "wrong" sound effect
    let wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    // Update the heading text to show the game over message
    $("h1").text("Game Over, Press Any Key to Restart");
    // After 200 milliseconds, remove the "game-over" class to end the animation
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Call the function to reset the game and start over
    startOver();
  }
}

// Function to generate the next color sequence for the game
function nextSequence() {
  // Clear the user's clicked pattern to start fresh for the new level
  userClickedPattern = [];
  // Increment the level
  level++;
  // Update the heading text to display the current level
  $("h1").text("Level " + level);
  // Generate a random number between 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);
  // Get a random color from the buttonColors array using the random number as an index
  let randomChosenColour = buttonColors[randomNumber];
  // Add the chosen color to the game pattern
  gamePattern.push(randomChosenColour);
  // Flash the chosen color by fading it in and out quickly
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // Play the sound associated with the chosen color
  playSound(randomChosenColour);
}

// Function to play a sound based on the provided color name
function playSound(name) {
  // Create an Audio object with the corresponding sound file path and play it
  let sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

// Function to animate the press effect on a button with the provided color name
function animatePress(currentColor) {
  // Add the class "pressed" to the button to show the press effect
  $("#" + currentColor).addClass("pressed");
  // After 100 milliseconds, remove the "pressed" class to end the animation
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to reset the game to its initial state
function startOver() {
  // Reset the level to 0
  level = 0;
  // Clear the game pattern
  gamePattern = [];
  // Clear the user's clicked pattern
  userClickedPattern = [];
  // Set the game as not started
  started = false;
}
