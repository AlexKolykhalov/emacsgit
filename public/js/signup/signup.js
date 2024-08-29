// @ts-check

import { getValues, showErrorMessages, showPopUpMessage } from "../utils/utils.js";

const signupBtn = document.querySelector('button');

// ************************** 1. Events *********************************//

signupBtn?.addEventListener('click', async () => {
    removeErrorMessages();
    // show spinner
    signupBtn.querySelector('img')?.removeAttribute('data-visible');
    try {
	/** @type {HTMLInputElement|null} */
	const email = document.querySelector('input#email');
	/** @type {HTMLInputElement|null} */
	const password = document.querySelector('input#password');
	if (email && password) {
	    const body = getValues(
		[
		    ".user-signup-form #email",
		    ".user-signup-form #password",
		]
	    );
	    const response = await fetch(
		'http://localhost:3000/signup',
		{
		    method: 'POST',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(body)
		}
	    );
	    // hide spinner
	    signupBtn.querySelector('img')?.setAttribute('data-visible', 'false');
	    if (response.status === 201) {
		const token = await response.json();
		localStorage.setItem('token', token);
		location.href = '/';
	    }
	    if (response.status === 400) {
		const data = await response.json();
		if (data.errors.length > 0) {
		    removeErrorMessages();
		    showErrorMessages(data.errors);
		} else {
		    showPopUpMessage("Registration could not be completed. If you have an account, please log in.");
		}
	    }
	}
    } catch (error) {
	// hide spinner
	signupBtn.querySelector('img')?.setAttribute('data-visible', 'false');
	showPopUpMessage("Lost internet connection");
    }
});

// ************************* 2. Functions *******************************//

function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.user-signup-form > div[data-status="error"]');
    errorMessages.forEach((item) => item.removeAttribute("data-status"));
}
