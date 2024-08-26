require('dotenv').config();


module.exports = {
    "development": {
	"username": process.env.DB_USER,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_NAME,
	"host":     process.env.DB_HOST,
	"dialect":  process.env.DB_DIALECT
    },
    "test": {
	"username": "postgres",
	"password": null,
	"database": "test",
	"host": "127.0.0.1",
	"dialect": "postgres"
    },
    "production": {
	"username": process.env.PROD_DB_USER,
	"password": process.env.PROD_DB_PASSWORD,
	"database": process.env.PROD_DB_NAME,
	"host":     process.env.PROD_DB_HOST,
	"dialect":  process.env.PROD_DB_DIALECT
    }
}
