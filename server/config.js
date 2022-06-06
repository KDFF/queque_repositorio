const dotenv = require('dotenv')

dotenv.config()

module.exports = {
	PORT: process.env.PORT,
	connectionString: process.env.CONNECTION_URL,
}