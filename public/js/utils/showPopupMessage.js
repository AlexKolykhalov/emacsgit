/**
 * Shows a popup at the bottom of the screen.
 * @param {string} msg
 */
function showPopUpMessage(msg) {
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

export { showPopUpMessage };
