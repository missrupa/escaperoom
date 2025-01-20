let questions = [];
let currentRoom = 0;

// Fetch questions from external JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();  // Load the first question after data is loaded
  })
  .catch(error => console.error('Error loading the questions:', error));

// Load the current question from the questions array
function loadQuestion() {
  if (questions.length > 0) {
    const questionContainer = document.getElementById('questionText');
    const currentQuestion = questions[currentRoom];
    questionContainer.textContent = currentQuestion.question;
    document.getElementById('answerInput').value = ''; // Clear the input field
  }
}

// Check if the user's answer is correct
function checkAnswer() {
  const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
  let userAnswers = userAnswer.split(" ");
  const correctAnswer = questions[currentRoom].answer.toLowerCase();
  let correctAnserWords = correctAnswer.split(" ");
  // Function to check if any element in array1 is found in array2
function isAnyElementFound(arr1, arr2) {
    return arr1.some(element => arr2.includes(element));
  }
  const response = document.getElementById('response');

  if (isAnyElementFound(userAnswers,correctAnserWords) ) {
    response.textContent = "Correct! You may move on to the next room.";
    currentRoom++;
    if (currentRoom < questions.length) {
      loadQuestion();
    } else {
      response.textContent = "Congratulations! You've escaped the room!";
      document.getElementById('questionContainer').style.display = 'none'; // Hide question container
    }
  } else {
    response.textContent = "Incorrect. Try again.";
  }
}
