/**
 * Sets 'data-status=error' for elements in the array.
 * @param {{ errors: { path: string; }[]; }} data
 */
function showErrorMessages(array, data) {
    removeErrorMessages();
    /** @type {HTMLInputElement|null} */
    const email = document.querySelector('#email');
    /** @type {HTMLInputElement|null} */
    const firstName = document.querySelector('#firstName');
    /** @type {HTMLInputElement|null} */
    const lastName = document.querySelector('#lastName');
    if (email && firstName && lastName) {
	data.errors.forEach((/** @type {{ path: string; }} */ item) => {
	    console.log(item.path, null, 2);
	    if (item.path === "email")
		email.parentElement?.setAttribute("data-status", "error");
	    if (item.path === "firstName")
		firstName.parentElement?.setAttribute("data-status", "error");
	    if (item.path === "lastName")
		lastName.parentElement?.setAttribute("data-status", "error");
	});
    } else {
	console.error("Can't find some element.");
    }
}


export { showErrorMessages };
