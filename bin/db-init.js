// Require modules
const mariadb = require('mariadb')
const yesno = require('yesno')

// Get vars from env
require('dotenv').config()
const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabasePort = process.env.DB_PORT
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD

// Save app as process
const app = process

// Check if DB connection data is set
if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log(
    '\n[Ninja] Init DB => Database configuration values not set. Please edit your .env file! Stopping...'
  )
  app.exit()
}

// Init Database
const init = () => {
  // Connect to database
  const pool = mariadb.createPool({
    host: DatabaseHost,
    user: DatabaseUser,
    port: DatabasePort,
    password: DatabasePassword
  })

  // Create database
  pool
    .getConnection()
    .then((connection) => {
      connection
        .query(`CREATE DATABASE \`${DatabaseName}\``)
        .then((res) => {
          console.log(`    => Database ${DatabaseName} created!`)
          // Close connection
          connection.end()
          // Run terminate()
          terminate()
        })
        .catch((err) => {
          console.log(
            `    => Database ${DatabaseName} already exists or incorrect permisions! Error: ${err.code}`
          )
          // Run terminate()
          terminate()
        })
    })
    .catch((err) => {
      console.log(`    => Cannot connect to database. Error: ${err.code}`)
      // Run terminate()
      terminate()
    })
}

// Terminate app
const terminate = () => {
  console.log('\n[Ninja] Init DB => Finished.\n')
  // Exit app
  app.exit()
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question:
        '\n[Ninja] Init DB => Initialize database \n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Init DB => Initialize database file (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    // Initialize database
    init()
  } else {
    console.log('\n[Ninja] Init DB => Stopping ... no changes were made. \n')
  }
}

start()
