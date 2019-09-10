const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper');
const yesno = require('yesno')
const mariadb = require('mariadb')

require('dotenv').config()

const DatabaseName = process.env.DB_NAME
const DatabaseHost = process.env.DB_HOST
const DatabaseUser = process.env.DB_USER
const DatabasePassword = process.env.DB_PASSWORD
const app = process
const Migration = process.env.DB_MIGRATION
const MigrationFile = path.join(__dirname, `../migrations/${process.env.DB_MIGRATION}`);

if (!DatabaseName || !DatabaseHost || !DatabaseUser) {
  console.log('Configuration values not set. Please edit your .env file!\n')
  app.exit();
}

const unzip = async () => {
  console.log(`(1) Unzipping "${Migration}" file...`)

  fs.createReadStream(`${MigrationFile}.sql.zip`)
   .pipe(unzipper.Parse())
      .on('entry', function (entry) {
        const fileName = entry.path;
        const type = entry.type; // 'Directory' or 'File'
        const size = entry.vars.uncompressedSize; // There is also compressedSize;
        if (fileName === `${Migration}.sql`) {
          entry.pipe(fs.createWriteStream(`${MigrationFile}.sql`));
        } else {
          entry.autodrain();
        }
      })
      .promise()
      .then(
        console.log(`(2) Migration "${Migration}" file unzipped ...`)
      )
}

const migrate = async () => {
  const pool = mariadb.createPool({
    host: DatabaseHost,
    database: DatabaseName,
    user: DatabaseUser,
    password: DatabasePassword
  })

  pool.getConnection()
    .then( connection => {
      console.log(`(3) Starting "${Migration}" migration ...`)
      const queries = fs.readFileSync(
        `${MigrationFile}.sql`, {
          encoding: "UTF-8"
        }).split(";\n");

      for (let query of queries) {
        query = query.trim();
        if (query.length !== 0 && !query.match(/\/\*/)) {
          connection.query(query)
        }
      }
    })
    .then( () => {
      console.log(`(4) Migration "${Migration}" finished.\n`)
      terminate()
    })
    .catch(err => {
      console.log(`Cannot connect to database. Error: ${err}`)
      terminate()
    })
}

const terminate = () => {
  console.log(`Temporary files deleted.`)
  fs.unlink(`${MigrationFile}.sql`, () => {})
  app.exit()
}

async function start() {
  const confirmation = await yesno({
    question: `Migration SQL "${Migration}" will overwrite your database! Are you sure you want to continue?\n`
  });

  if (confirmation) {
    await unzip()
    await migrate()
  } else {
    console.log('Stopping ... no changes were made. \n')
    app.exit()
  }
}

start()
