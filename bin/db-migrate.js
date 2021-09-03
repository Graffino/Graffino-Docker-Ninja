// Require modules
const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper')
const yesno = require('yesno')
const exec = require('child_process').exec

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
      console.log(`    => Migration file "${Migration}.zip" unzipped...\n`)
      migrate()
    })
    .catch((err) => {
      console.log(`    => Error Log:${err}`)
    })
}

const migrate = () => {
  console.log(`    => Migrating ${Migration}.sql file to the Database...`)
  exec(
    `mysql -h ${DatabaseHost} -P ${DatabasePort} -u${DatabaseUser} -p${DatabasePassword} ${DatabaseName} < ${MigrationFile}`,
    (err, stdout) => {
      if (err) {
        console.error(`    => Error log:\n\n${err}`)
        return
      }
      console.log(`    => Migration finished successfully.\n${stdout}`)
      terminate()
    }
  )
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
    try {
      await unarchive()
    } catch (err) {
      console.log(`    => Cannot unarchive file. Error: ${err.message}`)
    }
  } else {
    console.log('    => Stopping ... no changes were made.')
    terminate()
  }
}

start()
