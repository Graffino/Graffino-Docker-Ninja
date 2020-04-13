'use strict'

const yesno = require('yesno')
const path = require('path')
const dotenv = require('dotenv')
const { exec } = require('child_process')

// Save app as process
const app = process

// Get .env data
dotenv.config()
const remoteUser = process.env.REMOTE_USER
const remoteServer = process.env.REMOTE_SERVER
const remotePath = process.env.REMOTE_PATH
const remoteKeyName = process.env.REMOTE_KEY_NAME
const localPath = path.join(__dirname, '../wordpress/uploads')
const homedir = require('os').homedir()

// Check if DB connection data is set
if (!remoteUser || !remoteServer || !remotePath || !localPath) {
  console.log(
    '\n[Ninja] Sync Remote => Sync configuration values not set. Please edit your .env file! Stopping...\n'
  )
  app.exit()
}

console.log(localPath)
console.log(homedir)

const copyFromRemote = () => {
  exec(
    `rsync -chavzP -e 'ssh -i ${homedir}/.ssh/${remoteKeyName}' ${remoteUser}@${remoteServer}:${remotePath}/ ${localPath}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`    => Error log:\n\n${err}`)
        return
      }
      console.log(`    => Transfer information\n\n${stdout}`)
      console.log('[Ninja] Sync Remote => Finished.\n')
    }
  )
}

// Start async
async function start () {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: `\n[Ninja] Sync Remote => Syncs "${remoteServer}/${remotePath}" with "${localPath}"\n\n    WARNING:\n    This will delete orphaned files from your repo's uploads folder!\n\n    => Do you want to continue? (Y/N)\n`
    })
  }

  // If yes
  if (confirmation) {
    console.log('[Ninja] Sync Remote => Starting ... \n')
    copyFromRemote()
  } else {
    console.log('[Ninja] Sync Remote => Stopping ... no changes were made. \n')
  }
}

start()
