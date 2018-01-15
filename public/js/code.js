console.log("code.js");
var current = 0;
var score = 0;
var chosenAnswers = [];
var correctAnswers = [];

function nextPressed() {

  current++;
  console.log("Next button pressed");
  $('.question:eq(' + (current-1) + ')').hide();
  $('.question:eq(' + current + ')').show();
  console.log(current);

  if(current === document.getElementsByClassName("next").length) {
    console.log("quiz is done");
    $('.finish-screen').show();
  }
}

function submitQuiz() {
  $(".finish-screen").hide();
  $(".score-screen").show();
  //i want to compare the result of the radio button selected to the correct answer
  //gets an array of chosen answers
  for(var i = 0; i < $(".answer").length; i++) {
    if ($(".answer")[i].checked) {
      chosenAnswers.push(document.getElementsByClassName("answer")[i].parentNode.textContent);
    }
  }

  //gets an array of correct answers, might be able to dry up by combining with previous for loop
  for(var i = 0; i < $(".correct").length; i++) {
    console.log("this is the correct answer", document.getElementsByClassName("correct")[i].textContent);
    correctAnswers.push(document.getElementsByClassName("correct")[i].textContent);
  }
  console.log("this was the selected answer", chosenAnswers);
  console.log("these are the correct answers", correctAnswers);

  //compares the two arrays and adds to score
  for(var i = 0; i < correctAnswers.length; i++) {
    if(chosenAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }
  console.log("this is the score", score);
  document.getElementsByClassName("score-screen")[0].textContent += score;
}

$(document).ready(function() {
  $('.question').hide();
  $('.finish-screen').hide();
  $(".score-screen").hide();
  $('.question:eq(0)').show();

  for(var i = 0; i < document.getElementsByClassName("next").length; i++) {
    document.getElementsByClassName("next")[i].addEventListener("click", nextPressed);
  }
  document.getElementsByClassName("submit-quiz")[0].addEventListener("click", submitQuiz);
});