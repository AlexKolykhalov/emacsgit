// @ts-check

const addBtn = document.querySelector('.add-btn');

// ************************** 1. Events *********************************//

window.addEventListener('load', async () => {
    try {
	const response = await fetch('/api/keys');
	const data = await response.json();
	const list = document.querySelector('.result');
	if (list) {
	    data.rows.forEach((item) => {
		const listElement = createItem(item.id, item.data);
		list.appendChild(listElement);
	    });	    
	}
    } catch (error) {
	console.log(error);
    }
});

addBtn.addEventListener('click', async () => {
    const insert = document.querySelector('#input');
    if (insert) {
	try {
	    const response = await fetch(
		'/api/key',
		{
		    method: 'POST',
		    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({number: insert.value.trim()})
		}
	    );
	    if (response.status === 201) {
		const elementBD = await response.json();
		const list = document.querySelector('.result');
		if (list) {
		    const listElement = createItem(elementBD.id, elementBD.data);
		    list.appendChild(listElement);
		}
	    }
	} catch (error) {
	    console.log(error);
	}  	
    }
});

// ************************* 2. Functions *******************************//

function createItem(id, value) {
    const listElement = document.createElement('li');
    listElement.classList.add('row', 'gap-m', 'main-axis-space-between');
    listElement.setAttribute('data-index', id);
    listElement.innerHTML = `
                   <input type="text" value="${value}" disabled>
	           <div>
	             <button class="edit-btn">Edit</button>
	             <button class="save-btn" data-visible="false">Save</button>
	             <button class="remove-btn">Remove</button>
	           </div>`;
    const input = listElement.querySelector('input');
    const editBtn = listElement.querySelector('.edit-btn');
    const saveBtn = listElement.querySelector('.save-btn');
    const removeBtn = listElement.querySelector('.remove-btn');
    if (input && editBtn && saveBtn && removeBtn) {
	editBtn.addEventListener('click', () => {
	    input.removeAttribute('disabled');
	    saveBtn.removeAttribute('data-visible');
	    editBtn.setAttribute('data-visible', 'false');
	});
	saveBtn.addEventListener('click', async () => {
	    const id = listElement.getAttribute('data-index');
	    const res = await fetch(
		`/api/key/${id}`,
		{
		    method: 'PUT',
		    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({id: id, number: input.value.trim()})
		}
	    );
	    if (res.status === 200) {
		const elementBD = await res.json();
		input.setAttribute('value', elementBD.data);
		input.setAttribute('disabled', '');
		saveBtn.setAttribute('data-visible', 'false');
		editBtn.removeAttribute('data-visible');		
	    }
	});
	removeBtn.addEventListener('click', async () => {
	    try {
		const list = document.querySelector('.result');
		if (list) {
		    const id = listElement.getAttribute('data-index');
		    const res = await fetch(
			`/api/key/${id}`,
			{
			    method: 'DELETE',
			}
		    );
		    if (res.status === 204) list.removeChild(listElement);
		}
	    } catch (error) {
		console.log(error);
	    }
	});
    }

    return listElement;
}
