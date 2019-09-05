const mariadb = require('mariadb')
require('dotenv').config()

const themeDatabase = process.env.THEME_DB

const databaseConnect = () => {
  const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: ''
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
