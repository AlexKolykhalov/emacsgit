// @ts-check

import { getValues, showErrorMessages, showPopUpMessage } from "../utils/utils.js";


/** @type {HTMLButtonElement|null} */
const logoutBtn = document.querySelector('header button');

/** @type {HTMLButtonElement|null} */
const updateBtn = document.querySelector('main button');

/** @type {string} */
const baseUrl = location.hostname === 'localhost' ?
      "http://localhost:3000":
      "https://emacsgit.vercel.app";

// ************************** 1. Events *********************************//

window.addEventListener('load', async () => {
    try {
	const response = await fetch(
	    `${baseUrl}/user`,
	    requestOptionsWithAuthToken('GET')
	);
	if (response.status === 200) {
	    const user = await response.json();
	    fillElements(user);
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
		}
		if (resUser.status === 401) location.href = '/login';
	    }
	    if (resRefresh.status === 401) location.href = '/login';
	}
    } catch (error) {
	console.error('Internet connection error');
	location.href = '/login';
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
	console.error('Lost internet connection');
    }
});

updateBtn?.addEventListener('click', async () => {
    try {
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
	}
	if (response.status === 400) {
	    const data = await response.json();
	    showErrorMessages(data)
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
		}
		if (resUser.status === 400) {
		    const data = await response.json();
		    showErrorMessages(data);
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
	console.error("Lost Internet Connection");
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
    showPopUpMessage('Invalid access token. Redirect... 1, 2, 3...');
    setTimeout(() => location.href = '/login', 2000);
}
