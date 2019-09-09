const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper');
const yesno = require('yesno');
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
      }).promise().then(() => migrate())
}

const migrate = () => {
  const pool = mariadb.createPool({
    host: DatabaseHost,
    user: DatabaseUser,
    password: DatabasePassword,
    database: DatabaseName
  })

  pool.getConnection()
    .then(connection => {
      const queries = fs.readFileSync(`${MigrationFile}.sql`, {
        encoding: "UTF-8"
      }).split(";\n");

      for (let query of queries) {
        query = query.trim();
        if (query.length !== 0 && !query.match(/\/\*/)) {
          connection.query(query)
          .catch(err => {
            console.log(`Migration ${Migration} failed. Error: ${err.code}\n`)
            fs.unlink(`${MigrationFile}.sql`)
            app.exit()
          });
        } else {
          console.log(`... ${Migration} migration finished.\n`);
          fs.unlink(`${MigrationFile}.sql`)
          app.exit()
        }
      }
    })
    .catch(err => {
      console.log(`Cannot connect to database. Error: ${err.code}`)
      //fs.unlink(`${MigrationFile}.sql`)
      app.exit()
    })
  }

async function start() {
  const ok = await yesno({
    question: `${Migration} will overwrite your database! Are you sure you want to continue?`
  });

  if (ok) {
    console.log(`Starting migration ${Migration}.. \n`);
    migrate()
  } else {
    console.log('Stopping ... no changes were made. \n');
    app.exit();
  }
}

start()
