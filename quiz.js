const quizData = [
    {
      question: "What is the primary purpose of Bitcoin?",
      options: [
        "Decentralized digital currency",
        "Cloud storage solution",
        "Social media platform",
        "E-commerce website",
      ],
      answer: "Decentralized digital currency",
    },
    {
      question: "What does the term 'HODL' mean in cryptocurrency?",
      options: [
        "Hold On for Dear Life",
        "High On Digital Lending",
        "Hope Of Decentralized Loans",
        "Hold Original Digital Ledger",
      ],
      answer: "Hold On for Dear Life",
    },
    {
      question: "What is Ethereum primarily used for?",
      options: [
        "Smart contracts and decentralized applications",
        "Video streaming",
        "File storage",
        "Creating centralized banks",
      ],
      answer: "Smart contracts and decentralized applications",
    },
    {
      question: "What is a blockchain?",
      options: [
        "A decentralized ledger technology",
        "A type of cryptocurrency wallet",
        "A physical chain storing data",
        "A software to hack crypto accounts",
      ],
      answer: "A decentralized ledger technology",
    },
    {
      question: "Who is the creator of Bitcoin?",
      options: [
        "Satoshi Nakamoto",
        "Vitalik Buterin",
        "Elon Musk",
        "Charlie Lee",
      ],
      answer: "Satoshi Nakamoto",
    },
  ];
  
  // Initialize variables to track current question index, score, timer, and remaining time
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;
  
  // DOM elements for question, options, timer, and buttons
  const questionArea = document.getElementById("question");
  const optionsArea = document.getElementById("options");
  const timerElement = document.getElementById("timer");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");
  const scoreArea = document.getElementById("score-area");
  const scoreMessage = document.getElementById("score-message");
  const finalScore = document.getElementById("final-score");
  const restartBtn = document.getElementById("restart-btn");
  
  // Function to load a question into the quiz area
  function loadQuestion() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.classList.add("hidden"); // Hide the container briefly for a smooth transition effect
  
    setTimeout(() => {
      const currentQuestion = quizData[currentQuestionIndex]; // Get the current question object
      questionArea.textContent = currentQuestion.question; // Display the question text
  
      // Populate the answer options dynamically
      optionsArea.innerHTML = ""; // Clear previous options
      const shuffledOptions = currentQuestion.options.sort(() => Math.random() - 0.5); // Shuffle options
      shuffledOptions.forEach((option) => {
        const button = document.createElement("button"); // Create a button for each option
        button.textContent = option; // Set button text to the option
        button.onclick = () => handleOptionClick(button, currentQuestion.answer); // Add click handler
        optionsArea.appendChild(button); // Append the button to the options area
      });
  
      quizContainer.classList.remove("hidden"); // Show the container again
      startTimer(); // Start the timer for the question
    }, 500); // Add a slight delay for transition
  }
  
  // Function to handle an option being clicked
  function handleOptionClick(button, correctAnswer) {
    Array.from(optionsArea.children).forEach((btn) => (btn.disabled = true)); // Disable all buttons after one is clicked
    // Change the background color of the selected button based on whether it is correct
    button.style.backgroundColor = button.textContent === correctAnswer ? "green" : "red";
    if (button.textContent === correctAnswer) score++; // Increment the score if the answer is correct
    submitBtn.disabled = false; // Enable the Submit button
    stopTimer(); // Stop the timer
  }
  
  // Function to start the countdown timer
  function startTimer() {
    timeLeft = 10; // Reset the time left
    timerElement.textContent = `Time left: ${timeLeft} seconds`; // Update the timer text
  
    timer = setInterval(() => {
      timeLeft--; // Decrease the time left
      timerElement.textContent = `Time left: ${timeLeft} seconds`; // Update the timer display
      if (timeLeft <= 0) {
        // If time runs out
        clearInterval(timer); // Stop the timer
        Array.from(optionsArea.children).forEach((btn) => (btn.disabled = true)); // Disable all buttons
        submitBtn.disabled = false; // Enable the Submit button
      }
    }, 1000); // Decrease time every second
  }
  
  // Function to stop the countdown timer
  function stopTimer() {
    clearInterval(timer); // Clear the timer interval
  }
  
  // Event listener for the Submit button
  submitBtn.addEventListener("click", () => {
    submitBtn.disabled = true; // Disable the Submit button after it is clicked
    nextBtn.disabled = false; // Enable the Next button
  });
  
  // Event listener for the Next button
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < quizData.length) {
      loadQuestion(); // Load the next question
      submitBtn.disabled = true; // Disable the Submit button
      nextBtn.disabled = true; // Disable the Next button
    } else {
      showScore(); // Show the final score if all questions are answered
    }
  });
  
  // Event listener for the Restart button
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0; // Reset the question index
    score = 0; // Reset the score
    document.getElementById("question-area").classList.remove("hidden"); // Show the question area
    submitBtn.classList.remove("hidden"); // Show the Submit button
    nextBtn.classList.remove("hidden"); // Show the Next button
    scoreArea.classList.add("hidden"); // Hide the score area
    loadQuestion(); // Reload the first question
  });
  
  // Function to display the final score and feedback
  function showScore() {
    document.getElementById("question-area").classList.add("hidden"); // Hide the question area
    submitBtn.classList.add("hidden"); // Hide the Submit button
    nextBtn.classList.add("hidden"); // Hide the Next button
    scoreArea.classList.remove("hidden"); // Show the score area
  
    // Determine feedback based on score
    const feedback =
      score === quizData.length
        ? "Great job!"
        : score > quizData.length / 2
        ? "Good effort!"
        : "Keep practicing.";
    scoreMessage.textContent = feedback; // Display feedback message
    finalScore.textContent = `Your score: ${score}/${quizData.length}`; // Display the score
  }
  
  // Start the quiz by loading the first question
loadQuestion();
  
