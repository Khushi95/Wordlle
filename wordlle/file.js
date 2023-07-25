const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const container = document.querySelector(".container");
const wordDisplay = document.querySelector(".word-display");
const inputContainer = document.querySelector(".input-container");
const validWords = document.querySelector(".valid-words");
const submitButton = document.querySelector("#submit-button");
const errMessage = document.getElementById("err-message");

// Define word objects with their expected outputs
let wordsObj = {
	BOAT: ["AT", "TO", "BAT", "BOT", "OAT", "TAB", "BOAT"],
	CARD: ["ARC", "CAR", "CARD"],
	THEY: ["HE", "THE", "YET", "HEY", "THEY"]
};

let randomWord = "",
	currentWord = "",
	inputWord = "";
let foundWords = [];
let count = 0;

// Function to retrieve a random value from an array or object
const randomValue = (arr, obj = false) => {
	if (obj) {
		let keysArr = Object.keys(arr);
		return keysArr[Math.floor(Math.random() * keysArr.length)];
	} else {
		return arr[Math.floor(Math.random() * arr.length)];
	}
};

// Event listener for the submit button
submitButton.addEventListener("click", async () => {
	errMessage.innerText = "";
	inputContainer.innerText = "";

	// Get the expected words array
	let expectedOutputs = wordsObj[currentWord];

	// Get all the sections that contain dashes
	let expectedSection = document.querySelectorAll(".expected-section");

	// Check if the input word is expected and not already found
	if (expectedOutputs.includes(inputWord) && !foundWords.includes(inputWord)) {
		// Correct input
		count += 1;
		foundWords.push(inputWord);

		// Replace dashes with the input word
		let index = expectedOutputs.indexOf(inputWord);
		expectedSection[index].innerHTML = inputWord;
	} else {
		if (foundWords.includes(inputWord)) {
			errMessage.innerText = "Already entered!";
		} else {
			// Wrong input
			errMessage.innerText = "Invalid Word!!";
		}
	}

	// Check if all expected words have been found
	if (count == expectedOutputs.length) {
		// Display "You Won" message and restart button
		coverScreen.classList.remove("hide");
		container.classList.add("hide");
		result.classList.remove("hide");
		startButton.innerText = "Restart";
		submitButton.disabled = true;
	}

	// Reset letters to inactive and enable them for new input
	let letters = document.querySelectorAll(".letters");
	letters.forEach((button) => {
		button.classList.remove("active");
		button.disabled = false;
	});

	// Reset input word
	inputWord = "";
});

// Function to handle letter selection
const selectLetter = (e) => {
	errMessage.innerText = "";
	inputWord += e.target.innerText;
	e.target.classList.add("active");
	e.target.disabled = true;
	inputContainer.innerText += e.target.innerText;
};

// Function to display dashes for expected words
const displayDashes = () => {
	let expectedOutputs = wordsObj[currentWord];
	expectedOutputs.forEach((element) => {
		let displayItem = element.replace(/./g, '<span class="dashes">_ </span>');
		validWords.innerHTML += `<div class="expected-section">${displayItem}</div>`;
	});
};

// Event listener for the start button
startButton.addEventListener("click", () => {
	// Hide cover screen and show game container
	container.classList.remove("hide");
	coverScreen.classList.add("hide");
	errMessage.innerText = "";
	inputContainer.innerText = "";
	wordDisplay.innerHTML = "";
	inputWord = "";
	count = 0;
	submitButton.disabled = false;
	validWords.innerHTML = "";

	// Get a random word
	currentWord = randomValue(wordsObj, true);

	// Shuffle the letters of the current word
	randomWord = currentWord.split("").sort(() => 0.5 - Math.random());

	// Display dashes for expected words
	displayDashes();

	// Display letters in buttons
	randomWord.forEach((letter) => {
		wordDisplay.innerHTML += `<button class="letters" onclick="selectLetter(event)">${letter}</button>`;
	});
});

// Initialize the game screen on window load
window.onload = () => {
	coverScreen.classList.remove("hide");
	container.classList.add("hide");
	result.classList.add("hide");
};
