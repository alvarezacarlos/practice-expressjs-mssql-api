const { config } = require('dotenv')

// get variables stored in the .env file using the dotenv config module
config()

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER || '',
    DB_PWD: process.env.DB_PWD || '',
    DB_NAME: process.env.DB_NAME || '',
    SERVER: process.env.SERVER || '',
}