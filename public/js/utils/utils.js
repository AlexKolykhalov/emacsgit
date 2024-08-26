/**
 * @param {string[]} ids Array of selectors whose values must be selected
 * @returns {} {selector.id: selector.value}
 */
export function getValues(ids) {
    let values = {};
    ids.forEach((item) => {
	/** @type {HTMLInputElement|null} */
	const el = document.querySelector(item);
	if (el) {
	    values[el.id] = el.value;
	} else {
	    console.error(`Can't find ${item}`);
	}
    });

    return values;
}

/**
 * @param { { path: string; }[] } errors Errors have a `path` field,
 * which is a selector for searching on the page, if the element is found,
 * its parent is set `data-status="error"`
 */
export function showErrorMessages(errors) {
    errors.forEach((item) => {
	const el = document.querySelector(`#${item.path}`);
	if (el) {
	    el.parentElement?.setAttribute("data-status", "error");
	} else {
	    console.error(`Can't find #${item.path}`);
	}
    });
}

/**
 * Shows a popup at the bottom of the screen.
 * @param {string} msg
 */
export function showPopUpMessage(msg) {
    const popUpMessage = document.querySelector('.pop-up-message');
    if (popUpMessage) {
	const text = popUpMessage.querySelector('p');
	if (text) {
	    popUpMessage.removeAttribute('animated');
	    text.textContent = msg;	    
	    popUpMessage.setAttribute('animated', '');
	}
    } else {
	console.error("Can't find element with class 'pop-up-message'");
	console.error('For correct work use <div class="pop-up-message"></div>');
    }
}
