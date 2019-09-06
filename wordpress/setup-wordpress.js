const mariadb = require('mariadb')
require('dotenv').config()

const themeDatabase = process.env.THEME_DB
const DatabaseHost = process.env.DB_HOST
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD

const databaseConnect = () => {
  const pool = mariadb.createPool({
    host: DatabaseHost,
    user: DatabaseUser,
    password: DatabasePassword
  })

  pool.getConnection()
    .then(connection => {
      connection.query(`CREATE DATABASE ${themeDatabase}`)
        .then((res) => {
          console.log(res)
          connection.end()
        })
        .catch(err => {
          console.log(err)
          connection.end()
        })
    }).catch(err => {
      console.log(err)
    })
}

const run = async () => {
  databaseConnect()
  process.exit()
}

run()
