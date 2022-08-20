// Require modules
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn
const zip = new require('node-zip')()
const yesno = require('yesno')

// Get vars from env
require('dotenv').config()
const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabasePort = process.env.DB_PORT
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD

// Save app ass process
const app = process

// Check if DB connection data is set
if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log(
    '\n[Ninja] Dump DB => Database configuration values not set. Please edit your .env file! Stopping...\n'
  )
  app.exit()
}

// Create filename in format yyyy.mm.dd-hhmm.sql
const filename = () => {
  // Generate new date
  const today = new Date()
  // Get padded date data
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')
  const hour = today.getHours().toString().padStart(2, '0')
  const minute = today.getMinutes().toString().padStart(2, '0')
  // Return file name
  return `${year}.${month}.${day}-${hour}h${minute}m.sql`
}

// Dump database
const dump = () => {
  console.log('    => Dumping database...')

  // Open dump file
  const DumpFile = fs.createWriteStream(
    path.join(__dirname, '../wordpress/migrations/' + filename())
  )

  // Spawn mysqldump with required data
  const MysqlDump = spawn('mysqldump', [
    '-h',
    `${DatabaseHost}`,
    '-P',
    `${DatabasePort}`,
    '-u',
    `${DatabaseUser}`,
    `-p${DatabasePassword}`,
    `${DatabaseName}`
  ])

  // Run mysqldump
  MysqlDump.stderr.on('data', (error) => {
    if (error !== null) {
      console.log(`There was an error while dumping the database: ${error}`)
      // On error run terminate()
      terminate()
    }
  })

  // Run mysqldump
  MysqlDump.stdout
    .pipe(DumpFile)
    .on('finish', () => {
      console.log(
        '    => Dump was saved successfully to ' + filename() + ' file.'
      )
      // On finish run archive()
      archive()
    })
    .on('error', (err) => {
      console.log(
        `    => There was an error. The file was not saved successfully. Error: ${err}`
      )
      // On error run terminate()
      terminate()
    })
}

// Archive sql file to zip
const archive = () => {
  console.log('    => Zipping ' + filename() + ' file...')

  // Read sql file and zip it
  zip.file(
    filename(),
    fs.readFileSync(
      path.join(__dirname, '../wordpress/migrations/' + filename())
    )
  )
  const data = zip.generate({
    base64: false,
    compression: 'DEFLATE'
  })

  // Write sync zip as yyyy.mm.dd-hhmm.sql.zip
  fs.writeFileSync(
    path.join(__dirname, '../wordpress/migrations/' + filename() + '.zip'),
    data,
    'binary'
  )
  // Write sync zip as latest.sql.zip
  fs.writeFileSync(
    path.join(__dirname, '../wordpress/migrations/latest.sql.zip'),
    data,
    'binary'
  )
  // Run terminate app
  terminate()
}

// Terminate app
const terminate = () => {
  console.log('    => Deleting temporary files...')
  // Delete remaining sql file
  fs.unlink(
    path.join(__dirname, '../wordpress/migrations/' + filename()),
    () => {}
  )
  console.log('\n[Ninja] Dump DB => Finished.\n')
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
        '\n[Ninja] Dump DB => Dump current database to file \n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Dump DB => Dump current database to file (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    // Dump database
    dump()
  } else {
    console.log('\n[Ninja] Dump DB => Stopping ... no changes were made. \n')
  }
}

start()
