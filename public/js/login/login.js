// @ts-check

import { getValues, showErrorMessages, showPopUpMessage } from "../utils/utils.js";

/** @type {HTMLButtonElement|null} */
const loginBtn = document.querySelector('button');

/** @type {string} */
const baseUrl = location.hostname === 'localhost' ?
      "http://localhost:3000":
      "https://emacsgit.vercel.app";

// ************************** 1. Events *********************************//

loginBtn?.addEventListener('click', async () => {
    removeErrorMessages();
    // show spinner
    loginBtn.querySelector('img')?.removeAttribute('data-visible');
    try {
	const body = getValues(
	    [
		".user-login-form #email",
		".user-login-form #password",
	    ]
	);
	const response = await fetch(
	    `${baseUrl}/login`,
	    {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	    });
	// hide spinner
	loginBtn.querySelector('img')?.setAttribute('data-visible', 'false');
	if (response.status === 200) {
	    const token = await response.json();
	    localStorage.setItem('token', token);
	    location.href = '/';
	}
	if (response.status === 400) {
	    const data = await response.json();
	    removeErrorMessages();
	    showErrorMessages(data.errors);
	}
	if (response.status === 401) {
	    showPopUpMessage("Email and Password don't match");
	}
    } catch (error) {
	// hide spinner
	loginBtn.querySelector('img')?.setAttribute('data-visible', 'false');
	showPopUpMessage("Lost internet connection");
    }
});

// ************************* 2. Functions *******************************//

function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.user-login-form > div[data-status="error"]');
    errorMessages.forEach((item) => item.removeAttribute("data-status"));
}

