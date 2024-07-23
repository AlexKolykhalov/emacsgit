import db from '../db.js';


const create = async (req, res) => {
    const {number} = req.body;
    const data = await db.query('INSERT INTO number_list (data) VALUES ($1) RETURNING *', [number]);
    res.status(201).json(data.rows[0]);
};

const get = async (req, res) => {
    const data = await db.query('SELECT * FROM number_list;');
    res.json(data);
};

const update = async (req, res) => {
    try {
	const {id, number} = req.body;
	console.log(`update data id: ${id} number: ${number}`);
	const data = await db.query('UPDATE number_list SET data = $1 WHERE id = $2 RETURNING *', [number, id]);
	console.log(data);
	res.status(200).json(data.rows[0]);
    } catch (error) {
	res.status(400).send('Error');
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    console.log(`remove ID: ${id}`);
    if (id) {
	await db.query('DELETE FROM number_list WHERE id = $1;', [id]);
	res.status(204).send('Data deleted');
    } else {
	res.status(400).send('Data was not deleted');
    }
};


export {create, get, update, remove};
