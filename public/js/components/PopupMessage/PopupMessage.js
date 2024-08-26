// @ts-check

/** @type {HTMLDivElement|null} */
const popUpMessage = document.querySelector('.pop-up-message');

// ************************** 1. Events *********************************//

if (popUpMessage) {
    popUpMessage.classList.add("absolute", "border-radius-sm", "clr-n-000", "bg-p-red");
    const innerHtml = `
      <div class="row no-wrap gap-sm main-axis-center cross-axis-center pad-v-sm pad-h-m">
	<img alt="" src="../assets/icon-error.svg">
	<p class="fs-d-300-400 white-space-nowrap">Your changes have been successfully saved!</p>
      </div>`;
    popUpMessage.innerHTML = innerHtml;
} else {
    console.error("Can't find element with class 'pop-up-message'");
    console.error('For correct work use <div class="pop-up-message"></div>');
}

popUpMessage?.addEventListener('animationend', () => {
    popUpMessage.removeAttribute('animated');
}, false);

// ************************* 2. Functions *******************************//
