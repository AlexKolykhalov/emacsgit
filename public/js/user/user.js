// @ts-check

import { getValues, showErrorMessages, showPopUpMessage } from "../utils/utils.js";


/** @type {HTMLButtonElement|null} */
const logoutBtn = document.querySelector('header button');

/** @type {HTMLButtonElement|null} */
const deleteBtn = document.querySelector('main button:nth-of-type(1)');

/** @type {HTMLButtonElement|null} */
const updateBtn = document.querySelector('main button:nth-of-type(2)');

/** @type {HTMLButtonElement|null} */
const dialogBtnCancel = document.querySelector('dialog button:nth-of-type(1)');

/** @type {HTMLButtonElement|null} */
const dialogBtnConfirm = document.querySelector('dialog button:nth-of-type(2)');

/** @type {string} */
const baseUrl = location.hostname === 'localhost' ?
      "http://localhost:3000":
      "https://emacsgit.vercel.app";

// ************************** 1. Events *********************************//

window.addEventListener('load', async () => {
    try {
	disableInteractiveElements();
	const response = await fetch(
	    `${baseUrl}/user`,
	    requestOptionsWithAuthToken('GET')
	);
	if (response.status === 200) {
	    const user = await response.json();
	    fillElements(user);
	    enableInteractiveElements();
	}
	if (response.status === 401) {
	    const resRefresh = await fetch(`${baseUrl}/refresh`);
	    if (resRefresh.status === 200) {
		const token = await resRefresh.json();
		localStorage.setItem('token', token);
		const resUser = await fetch(
		    `${baseUrl}/user`,
		    requestOptionsWithAuthToken('GET')
		);
		if (resUser.status === 200) {
		    const user = await resUser.json();
		    fillElements(user);
		    enableInteractiveElements();
		}
		if (resUser.status === 401) redirect();
	    }
	    if (resRefresh.status === 401) redirect();
	}
    } catch (error) {	
	redirect();
    }
});

logoutBtn?.addEventListener('click', async () => {
    try {
	const response = await fetch(`${baseUrl}/logout`);
	if (response.status === 200) {
	    localStorage.removeItem('token');
	    location.href = '/login';
	}
    } catch (error) {
	showPopUpMessage("Lost internet connection");
	enableInteractiveElements();
    }
});

updateBtn?.addEventListener('click', async () => {
    try {
	removeErrorMessages();
	disableInteractiveElements();
	const body = getValues(
	    [
		".user-update-form #email",
		".user-update-form #firstName",
		".user-update-form #lastName"
	    ]
	);
	const response = await fetch(
	    `${baseUrl}/user`,
	    requestOptionsWithAuthToken('PUT', body)
	);
	if (response.status === 201) {
	    const user = await response.json();
	    fillElements(user);
	    enableInteractiveElements();
	}
	if (response.status === 400) {
	    const data = await response.json();
	    removeErrorMessages();
	    showErrorMessages(data.errors);
	    enableInteractiveElements();
	}
	if (response.status === 401) {
	    const resRefresh = await fetch(`${baseUrl}/refresh`);
	    if (resRefresh.status === 200) {
		const token = await resRefresh.json();
		localStorage.setItem('token', token);
		const resUser = await fetch(
		    `${baseUrl}/user`,
		    requestOptionsWithAuthToken('PUT', body),
		);
		if (resUser.status === 201) {
		    const user = await resUser.json();
		    fillElements(user);
		    enableInteractiveElements();
		}
		if (resUser.status === 400) {
		    const data = await response.json();
		    removeErrorMessages();
		    showErrorMessages(data.errors);
		    enableInteractiveElements();
		}
		if (resUser.status === 401) {
		    redirect();
		}
	    }
	    if (resRefresh.status === 401) {
		redirect();
	    }
	}
    } catch (error) {
	showPopUpMessage("Lost internet connection");
	enableInteractiveElements();
    }
});

deleteBtn?.addEventListener('click', () => {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
});

dialogBtnCancel?.addEventListener("click", () => {
    const dialog = document.querySelector('dialog');
    dialog?.close();
});

dialogBtnConfirm?.addEventListener("click", async () => {
    try {
	const dialog = document.querySelector('dialog');
	dialog?.close();
	disableInteractiveElements();
	// show spinner
	deleteBtn?.querySelector('img')?.removeAttribute('data-visible');
	const response = await fetch(
	    `${baseUrl}/user`,
	    requestOptionsWithAuthToken('DELETE')
	);
	if (response.status === 204) {
	    localStorage.removeItem('token');
	    location.href = '/login';
	}
	if (response.status === 401) {
	    const resRefresh = await fetch(`${baseUrl}/refresh`);
	    if (resRefresh.status === 200) {
		const token = await resRefresh.json();
		localStorage.setItem('token', token);
		const resUser = await fetch(
		    `${baseUrl}/user`,
		    requestOptionsWithAuthToken('DELETE'),
		);
		if (resUser.status === 204) {
		    localStorage.removeItem('token');
		    location.href = '/login';
		}
		if (resUser.status === 401) {
		    redirect();
		}
	    }
	    if (resRefresh.status === 401) {
		redirect();
	    }
	}
    } catch (error) {
	// hide spinner
	deleteBtn?.querySelector('img')?.setAttribute('data-visible', 'false');
	showPopUpMessage("Lost internet connection");
	enableInteractiveElements();
    }
});

// ************************* 2. Functions *******************************//

/**
 * Returns request options with Authorization header with token.
 * @param {string} method GET, POST, PUT, DELETE
 * @param {{}} [body]
 * @returns {{
 *     method:string,
 *     headers: {
 *	  'Authorization':string,
 *	  'Content-Type'?:string
 *     },
 *     body?:string
 *   }
 * }
 */
function requestOptionsWithAuthToken(method, body) {
    let options = {
        method: method,
        headers: {
	    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    };
    if (body) {
	options.headers = {...options.headers, 'Content-Type': 'application/json'};
	options         = {...options, body: JSON.stringify(body)};
    }
    return options;
}

/**
 * @param {{ email: string; firstName: string; lastName: string; }} data
 */
function fillElements(data) {
    removeErrorMessages();
    /** @type {HTMLInputElement|null} */
    const email = document.querySelector('#email');
    /** @type {HTMLInputElement|null} */
    const firstName = document.querySelector('#firstName');
    /** @type {HTMLInputElement|null} */
    const lastName = document.querySelector('#lastName');
    if (email && firstName && lastName) {
	email.value     = data.email;
	firstName.value = data.firstName;
	lastName.value  = data.lastName;
    } else {
	console.error("Can't find some element.");
    }
}

function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.user-update-form > div[data-status="error"]');
    errorMessages.forEach((item) => item.removeAttribute("data-status"));
}

function redirect() {
    showPopUpMessage("Invalid access token. Redirect... 1, 2, 3...");
    setTimeout(() => location.href = '/login', 2000);
}

function disableInteractiveElements() {
    const activeElements = document.querySelectorAll("input, button");
    activeElements.forEach((item) => item.setAttribute("disabled", ""));
}

function enableInteractiveElements() {
    const disableElements = document.querySelectorAll("[disabled]");
    disableElements.forEach((item) => item.removeAttribute("disabled"));
}

