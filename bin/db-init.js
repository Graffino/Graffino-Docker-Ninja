// Require modules
const mariadb = require('mariadb')

// Get vars from env
require('dotenv').config()
const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD

// Save app as process
const app = process

// Check if DB connection data is set
if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log('Database configuration values not set. Please edit your .env file!')
  app.exit()
}

// Start
const start = () => {
  // Connect to database
  const pool = mariadb.createPool({
    host: DatabaseHost,
    user: DatabaseUser,
    password: DatabasePassword
  })

  // Create database
  pool.getConnection()
    .then(connection => {
      connection.query(`CREATE DATABASE \`${DatabaseName}\``)
        .then((res) => {
          console.log(`Database ${DatabaseName} created!`)
          // Close connection
          connection.end()
          // Run terminate()
          terminate()
        })
        .catch(err => {
          console.log(`Database ${DatabaseName} already exists or incorrect permisions! Error: ${err.code}`)
          // Run terminate()
          terminate()
        })
    }).catch(err => {
      console.log(`Cannot connect to database. Error: ${err.code}`)
      // Run terminate()
      terminate()
    })
}

// Terminate app
const terminate = () => {
  console.log('Temporary files deleted.')
  // Exit app
  app.exit()
}

start()
