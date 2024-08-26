// @ts-check

/** @type {HTMLDivElement|null} */
const popUpMessage = document.querySelector('.pop-up-message');

// ************************** 1. Events *********************************//

popUpMessage?.addEventListener('animationend', () => {
    popUpMessage.removeAttribute('animated');
}, false);

// ************************* 2. Functions *******************************//

/**
 * Shows a popup at the bottom of the screen.
 * @param {string} msg
 * @param {string} type Available values are 'error' and 'notification'
 */
function showPopUpMessage(msg, type) {
    const popUpMessage = document.querySelector('.pop-up-message');
    if (popUpMessage) {
	const text = popUpMessage.querySelector('p');
	if (text) {
	    popUpMessage.removeAttribute('animated');
	    text.textContent = msg;
	    if (type === 'error') {
		popUpMessage.classList.add('bg-p-red');
		popUpMessage.classList.remove('bg-p-green');
	    }
	    if (type === 'notification') {
		popUpMessage.classList.add('bg-p-green');
		popUpMessage.classList.remove('bg-p-red');
	    }
	    popUpMessage.setAttribute('animated', '');
	}
    }
}


export default showPopUpMessage;
