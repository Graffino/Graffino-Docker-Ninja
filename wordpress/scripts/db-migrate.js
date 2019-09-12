// Require modules
const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper');
const yesno = require('yesno')
const mariadb = require('mariadb')

// Get vars from env
require('dotenv').config()
const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD
const Migration = process.env.DB_MIGRATION

// Save app as process
const app = process

// Path to migration
const MigrationFile = path.join(__dirname, `../migrations/${process.env.DB_MIGRATION}.sql`);

// Check if DB connection data is set
if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log('Configuration values not set. Please edit your .env file!\n')
  terminate();
}

// Unarchive zip file
const unarchive = async () => {
  console.log(`(1) Unzipping "${Migration}" file...`)

  // Read zip file
  fs.createReadStream(`${MigrationFile}.zip`)
    // Parse zip file
   .pipe(unzipper.Parse())
      .on('entry', function (entry) {
        // Get entry type
        const name = entry.path
        // If it's a file
        if (name.includes('sql') && ! name.includes('__')) {
          // Unzip it and save it
          entry.pipe(fs.createWriteStream(`${MigrationFile}`));
        } else {
          // Throw it away
          entry.autodrain();
        }
      })
      .promise()
      .then( () => {
        migrate()
        console.log(`(2) Migration "${Migration}" file unzipped ...`)
      })
}

// Load db file async
const migrate = async () => {
  // Connect to database
  const pool = mariadb.createPool({
    host: DatabaseHost,
    database: DatabaseName,
    user: DatabaseUser,
    password: DatabasePassword,
    multipleStatements: true
  })

  pool.getConnection()
    .then(connection => {
      console.log(`(3) Starting "${Migration}" migration ...`)

      // Read sql file and split it by newline
      const query = fs.readFileSync(
        `${MigrationFile}`, {
          encoding: 'UTF-8'
        }
      );

      connection.query(query)
        .then(() => {
          console.log(`(5) Migration "${Migration}" finished.\n`)
          // Run terminate()
          terminate()
        })
        .catch(err => {
          console.log(`Cannot connect to database. Error: ${err}`)
          // Run terminate()
          terminate()
        })
    })
}

// Terminate app
const terminate = () => {
  console.log(`Temporary files deleted.`)
  // Delete remaining sql file
  fs.unlink(`${MigrationFile}`, () => {})
  // Exit app
  app.exit()
}

// Start async
async function start() {
  // Implement confirmation
  const confirmation = await yesno({
    question: `WARNING: Migration file "${Migration}.zip" will overwrite your database! Are you sure you want to continue?\n`
  });

  // If yes
  if (confirmation) {
    // Wait for unarchive to finish
    await unarchive()
  } else {
    console.log('Stopping ... no changes were made. \n')
    terminate()
  }
}

start()
