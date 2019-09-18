// Require modules
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn
const zip = new require('node-zip')()

// Get vars from env
require('dotenv').config()
const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD

// Save app ass process
const app = process

// Check if DB connection data is set
if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log('Database configuration values not set. Please edit your .env file!\n')
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
const start = () => {
  console.log('(1) Dumping database.')

  // Open dump file
  const DumpFile = fs.createWriteStream(path.join(__dirname, '../migrations/' + filename()))

  // Spawn mysqldump with required data
  const MysqlDump = spawn('mysqldump', [
    '-h',
    `${DatabaseHost}`,
    '-u',
    `${DatabaseUser}`,
    `-p${DatabasePassword}`,
    `${DatabaseName}`
  ])

  // Run mysqldump
  MysqlDump
    .stdout
    .pipe(DumpFile)
    .on('finish', () => {
      console.log('(2) Dump was saved successfully to ' + filename() + ' file.')
      // On finish run archive()
      archive()
    })
    .on('error', err => {
      console.log(`There was an error. The file was not saved successfully. Error: ${err}`)
      // On error run terminate()
      terminate()
    })
}

// Archive sql file to zip
const archive = () => {
  console.log('(3) Zipping ' + filename() + ' file...')

  // Read sql file and zip it
  zip.file(filename(), fs.readFileSync(path.join(__dirname, '../migrations/' + filename())))
  const data = zip.generate({
    base64: false,
    compression: 'DEFLATE'
  })

  // Write sync zip as yyyy.mm.dd-hhmm.sql.zip
  fs.writeFileSync(path.join(__dirname, '../migrations/' + filename() + '.zip'), data, 'binary')
  // Write sync zip as latest.sql.zip
  fs.writeFileSync(path.join(__dirname, '../migrations/latest.sql.zip'), data, 'binary')
  // Run terminate app
  terminate()
}

// Terminate app
const terminate = () => {
  console.log('Temporary files deleted.')
  // Delete remaining sql file
  fs.unlink(path.join(__dirname, '../migrations/' + filename()), () => {})
  // Exit app
  app.exit()
}

start()
