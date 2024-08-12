require('dotenv').config();


module.exports = {
    "development": {
	"username": process.env.DB_USER,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_NAME,
	"host": process.env.DB_HOST,
	"dialect": process.env.DB_DIALECT
    },
    "test": {
	"username": "postgres",
	"password": null,
	"database": "test",
	"host": "127.0.0.1",
	"dialect": "postgres"
    },
    "production": {
	"username": "root",
	"password": null,
	"database": "prod",
	"host": "127.0.0.1",
	"dialect": "mysql"
    }
}
