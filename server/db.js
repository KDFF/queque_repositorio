// db.js

const Pool = require("pg").Pool

const pool = new Pool({ // conexión a elephantSQL
	user: "hhxhhzus",
	password: "UjDoWwTT7_nP4G9ndYEfiIluwjv4Ny06",
	database: "hhxhhzus",
	host: "rajje.db.elephantsql.com",
	port: 5432

})

module.exports = pool;
