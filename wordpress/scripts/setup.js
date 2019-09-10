const mariadb = require('mariadb')
require('dotenv').config()

const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD
const app = process

if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log('Configuration values not set. Please edit your .env file!')
  app.exit();
}

const databaseConnect = () => {
  const pool = mariadb.createPool({
    host: DatabaseHost,
    user: DatabaseUser,
    password: DatabasePassword
  })

  pool.getConnection()
    .then(connection => {
      connection.query(`CREATE DATABASE \`${DatabaseName}\``)
        .then((res) => {
          console.log(`Database ${DatabaseName} created!`)
          connection.end()
          app.exit()
        })
        .catch(err => {
          console.log(`Database ${DatabaseName} already exists or incorrect permisions! Error: ${err.code}`)
          app.exit()
        })
    }).catch(err => {
      console.log(`Cannot connect to database. Error: ${err.code}`)
      app.exit()
    })
}

databaseConnect()
