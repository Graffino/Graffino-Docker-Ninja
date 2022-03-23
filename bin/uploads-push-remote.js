'use strict'

const yesno = require('yesno')
const path = require('path')
const dotenv = require('dotenv')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

// Save app as process
const app = process

// Get .env data
dotenv.config()
const remoteUser = process.env.REMOTE_USER
const remoteServer = process.env.REMOTE_SERVER
const remotePath =
  process.env.REMOTE_PATH || 'docroot/dist-wp/wp-content/uploads'
const localPath = path.join(__dirname, '../wordpress/uploads')

// Check if DB connection data is set
if (!remoteUser || !remoteServer) {
  console.log(
    '\n[Ninja] Push Uploads to Remote => Sync configuration values (REMOTE_USER, REMOTE_SERVER, REMOTE_PATH) not set. Please edit your .env file! Stopping...\n'
  )
  app.exit()
}

const createRemoteFolder = async () => {
  console.log(`    => Create remote folder\n\n`)
  await exec(
    `ssh ${remoteUser}@${remoteServer} "mkdir -p ${remotePath}"`,
    (err, stdout) => {
      if (err) {
        console.error(`    => Error log:\n\n${err}`)
        return
      }
      console.log(
        `[Ninja] Push Uploads to Remote => Remote Folder Created. ${stdout}\n`
      )
      pushToRemote()
    }
  )
}

const pushToRemote = async () => {
  await exec(
    `rsync -chavzP ${localPath}/ ${remoteUser}@${remoteServer}:${remotePath}/`,
    (err, stdout) => {
      if (err) {
        console.error(`    => Error log:\n\n${err}`)
        return
      }
      console.log(`    => Transfer information\n\n${stdout}`)
      console.log('[Ninja] Push Uploads to Remote => Finished.\n')
    }
  )
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: `\n[Ninja] Push Uploads to Remote => Syncs "${remoteServer}/${remotePath}" with "${localPath}"\n\n    WARNING:\n    This will delete orphaned files from your repo's uploads folder!\n\n    => Do you want to continue? (Y/N)\n`
    })
  }

  // If yes
  if (confirmation) {
    console.log('[Ninja] Push Uploads to Remote => Starting ... \n')
    createRemoteFolder()
  } else {
    console.log(
      '[Ninja] Push Uploads to Remote => Stopping ... no changes were made. \n'
    )
  }
}

start()
