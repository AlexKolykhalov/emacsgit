import pg from 'pg';
const {Pool} = pg;


const db = new Pool({user: 'postgres',
		     password: '',
		     host: 'localhost', 
		     port: 5432,
		     database: 'demo'});


export default db;
