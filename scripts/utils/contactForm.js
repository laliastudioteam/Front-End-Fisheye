function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


// Fix error Variables
const minFirst = 2;
const minLast = 2;
const minMessage = 10;
const checkById = [];

// Empty error content
const errorAlerts = {
	first: [
		"Le prénom contient des chiffres ou compte moins de " + minFirst+ " lettres",
		checkFirst,
	],
	last: [
		"Le nom contient des chiffres ou compte moins de " + minLast + " lettres",
		checkLast,
	],
	email: ["L'email est de forme invalide", checkEmail],
	message: ["Le message est vide", checkMessage],

};

let errorDataInput;

// Boucle
for (let errorMessageKey in errorAlerts) {
	// Get Elements By ID;
	checkById[errorMessageKey] = document.getElementById(errorMessageKey);
	errorDataInput = document.getElementById(errorMessageKey).closest(".formData");
	errorDataInput.setAttribute("data-error", errorAlerts[errorMessageKey][0]);

	if (errorAlerts[errorMessageKey][1]) {
		// Input Listener
		checkById[errorMessageKey].addEventListener(
			"change",
			errorAlerts[errorMessageKey][1]
		);
		console.log("Ecouteur " + errorMessageKey + " actif");
	}
}

// Check variables
let inputToTest;

// Empty error count
let errorForm = 0;

// Function with value
function setErrorInput(inputToSet, field) {
	inputToSet.setAttribute("data-error-visible", "true");
	errorForm++;
}

// Function with value
function hideErrorInput(inputToSet, field) {
	inputToSet.setAttribute("data-error-visible", "false");
}

// Check if only letters
const expLetters = new RegExp(/\d+/g);

function onlyLetters(stringTotest) {
	//	console.log("test: " + stringTotest + " : " + expLetters.test(stringTotest))
	let testVarNumber = expLetters.test(stringTotest);
	return testVarNumber;
}

// Firstname validation
function checkFirst() {
	hideErrorInput(checkById["first"].closest(".formData"), "first");
	if (
		checkById["first"].value.length < minFirst ||
		onlyLetters(checkById["first"].value)
	) {
		setErrorInput(checkById["first"].closest(".formData"), "first");
	}
}

// Lastname validation
function checkLast() {
	hideErrorInput(checkById["last"].closest(".formData"), "last");
	if (
		checkById["last"].value.length < minFirst ||
		onlyLetters(checkById["last"].value)
	) {
		setErrorInput(checkById["last"].closest(".formData"), "last");
	}
}

// Email validation
const regularExpressionEmailCheck =
	/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

function checkEmail() {
	hideErrorInput(checkById["email"].closest(".formData"), "email");
	if (!regularExpressionEmailCheck.test(checkById["email"].value)) {
		setErrorInput(checkById["email"].closest(".formData"), "email");
	}
}

// Lastname validation
function checkMessage() {
	hideErrorInput(checkById["message"].closest(".formData"), "message");
	if (
		checkById["message"].value.length < minMessage ||
		onlyLetters(checkById["message"].value)
	) {
		setErrorInput(checkById["message"].closest(".formData"), "message");
	}
}


// Modal Button
const modalButton = document.querySelector(".contact_button");

modalButton.addEventListener("click", function (event) {
	event.preventDefault();
	validate();
});


// checks before submit
function validate() {
	// Prevent Form to validate


	errorForm = 0;

	let errorDataInput;

	// Boucle error messages
	for (let errorMessageKey in errorAlerts) {
		// Get Elements By ID;
		checkById[errorMessageKey] = document.getElementById(errorMessageKey);
		errorDataInput = document.getElementById(errorMessageKey).closest(".formData");
		errorDataInput.setAttribute("data-error-visible", "false");
	}

	// Check firstName
	checkFirst();

	// Check lastName
	checkLast();

	// Check mail
	checkEmail();

	// Check birthDate
	checkMessage();

	// Check if error to submit .. or not
	if (errorForm == 0) {
    let donneesForm = {};

	console.log("Valeurs:");
	for (let inputId in checkById) {
		


		console.log("Valeur pour "+inputId+" est "+document.getElementById(inputId).value);
        donneesForm[inputId] = document.getElementById(inputId).value;
		
	}
    console.log(donneesForm);
	} else {
		return false;
	}
}
