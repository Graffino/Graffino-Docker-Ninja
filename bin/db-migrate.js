// Require modules
const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper')
const yesno = require('yesno')
const mariadb = require('mariadb')

// Get vars from env
require('dotenv').config()
const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabasePort = process.env.DB_PORT
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD
const Migration = process.env.DB_MIGRATION

// Save app as process
const app = process

// Path to migration
const MigrationFile = path.join(
  __dirname,
  `../wordpress/migrations/${process.env.DB_MIGRATION}.sql`
)

// Check if DB connection data is set
if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log(
    '\n[Ninja] Migrate DB => Database configuration values not set. Please edit your .env file! Stopping...\n'
  )
  app.exit()
}

// Unarchive zip file
const unarchive = async () => {
  console.log(`    => Unzipping migration file "${Migration}.zip"...`)

  // Read zip file
  fs.createReadStream(`${MigrationFile}.zip`)
    // Parse zip file
    .pipe(unzipper.Parse())
    .on('entry', function (entry) {
      // Get entry type
      const name = entry.path
      // If it's a file
      if (name.includes('sql') && !name.includes('__')) {
        // Unzip it and save it
        entry.pipe(fs.createWriteStream(`${MigrationFile}`))
      } else {
        // Throw it away
        entry.autodrain()
      }
    })
    .promise()
    .then(() => {
      migrate()
      console.log(`    => Migration file "${Migration}.zip" unzipped...`)
    })
}

// Load db file async
const migrate = async () => {
  // Connect to database
  const pool = mariadb.createPool({
    host: DatabaseHost,
    port: DatabasePort,
    database: DatabaseName,
    user: DatabaseUser,
    password: DatabasePassword,
    multipleStatements: true
  })

  pool
    .getConnection()
    .then((connection) => {
      console.log(`    => Starting migration of "${Migration}.sql" file...`)

      // Read sql file and split it by newline
      const query = fs.readFileSync(`${MigrationFile}`)

      connection
        .query(query)
        .then(() => {
          console.log(`    => Migration of "${Migration}.sql" file finished...`)
          // Run terminate()
          terminate()
        })
        .catch((err) => {
          console.log(`    => Cannot connect to database. Error: ${err.code}`)
          // Run terminate()
          terminate()
        })
    })
    .catch((err) => {
      console.log(` => Cannot execute querry. Error: ${err.message}`)
    })
}

// Terminate app
const terminate = () => {
  console.log('    => Deleting temporary files...')
  // Delete remaining sql file
  fs.unlink(`${MigrationFile}`, () => {})

  console.log('\n[Ninja] Migrate DB => Finished.\n')
  // Exit app
  app.exit()
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: `\n[Ninja] Migrate DB => Imports "${Migration}.zip" file\n\n    WARNING:\n    This will overwrite your database!\n    Make sure to run "wp:dump" first! \n\n    => Do you want to continue? (Y/N)\n`
    })
  } else {
    console.log(
      `\n[Ninja] Migrate DB => Imports "${Migration}.zip" file (--no-confirm)\n`
    )
  }

  // If yes
  if (confirmation) {
    // Wait for unarchive to finish
    await unarchive()
  } else {
    console.log('    => Stopping ... no changes were made.')
    terminate()
  }
}

start()
