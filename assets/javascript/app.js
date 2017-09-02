// ### Option One: Basic Quiz (Timed Form)

// ![Basic](Images/1-basic.jpg)

// **[Click Here to Watch the Demo](basic-trivia-demo.mov)**.

// * You'll create a trivia form with multiple choice or true/false options (your choice).

// * The player will have a limited amount of time to finish the quiz. 

//   * The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

// * Don't let the player pick more than one answer per question.

// * Don't forget to include a countdown timer.


$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//start button triggers function generateHTML(), which creates the HTML with quiz

$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); // Closes reset-button click

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 

}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who was the first UFC Champion?", "Who was the first Pride Grand Prix Champion?", "Who was the first person to win both UFC and Pride championships?", "Who's nickname is 'The Axe Murderer' ?", "Who is the 'first family of MMA'?", "Which of these moves is not allowed in the modern-day UFC?", "Which of these movies was not allowed in Pride?", " 'Right leg hospital, left leg cemetary' refers to which fighter's kicking ability?"];
var answerArray = [["Rickson Gracie", "Matt Hughes", "Royce Gracie", "James Van Der Beek"], ["Fedor Emelianenko","Jean Claude Van Damme","Mark Coleman","Conor McGregor"], ["James Bond", "Chuck Norris", "Mark Coleman", "Bruce Leeroy"], ["Quinton Jackson","Alistair Overeem","Wanerlei Silva","Takanori Gomi"], ["Lee family", "Machado family", "Gracie family", "Miletich family"], ["elbows","punches","stomps to a downed opponent","knees to standing opponenet"], ["kicks", "stomps to downed opponenet", "elbows", "knees to downed opponent"], ["Anderson Silva","Dhalsim","Mirko Crocop Filopovic","Mark Hunt"]];
var imageArray = ["<img class='center-block img-right' src='../images/ufc-logo.jpg'>", "<img class='center-block img-right' src='../images/Pride-FC-logo-large.png'>", "<img class='center-block img-right' src='../images/hammer.png'>", "<img class='center-block img-right' src='../images/axe.jpg'>", "<img class='center-block img-right' src='../images/bjj.jpg'>", "<img class='center-block img-right' src='../images/anderson.jpg'>", "<img class='center-block img-right' src='../images/rampage-slam.jpg'>", "<img class='center-block img-right' src='../images/left-high-kick.jpg'>"];
var correctAnswers = ["C. Royce Gracie", "C. Mark Coleman", "C. Mark Coleman", "C. Wanderlei Silva", "C. Gracie family", "C. Stomps to a downed opponenet", "C. elbows", "C. Mirko Crocop Filopovic"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
