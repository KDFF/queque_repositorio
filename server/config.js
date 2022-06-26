const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    connectionString: process.env.CONNECTION_URL,
    JWT_SECRET: process.env.JWT_SECRET,
}
