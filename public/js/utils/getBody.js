/**
 * @param {string[]} ids
 */
function getBody(ids) {
    let body = {};
    ids.forEach((item) => {
	/** @type {HTMLInputElement|null} */
	const el = document.querySelector(`#${item}`);
	if (el) {
	    body[`${item}`] = el.value;
	} else {
	    console.error(`Can't find #${item}`);
	}
    });

    return body;
    //  /** @type {HTMLInputElement|null} */
    // const email = document.querySelector('#email');
    // /** @type {HTMLInputElement|null} */
    // const firstName = document.querySelector('#firstName');
    // /** @type {HTMLInputElement|null} */
    // const lastName = document.querySelector('#lastName');
    // if (email && firstName && lastName) {
    // 	return {
    // 	    'email':     email.value,
    // 	    'firstName': firstName.value,
    // 	    'lastName':  lastName.value,
    // 	};
    // } else {
    // 	console.error("Can't find some element.");
    // }
}


export { getBody };
