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
const remoteUser = 'assets.graffino.net'
const remoteServer = 'connect.graffino.net'
const remotePath = 'docroot/artifacts/' + process.env.STAGING_ARTIFACT_PATH
const localPath = path.join(__dirname, '../wordpress/')
const localFile = path.join(__dirname, '../wordpress/uploads.zip')

// Check if DB connection data is set
if (!process.env.STAGING_ARTIFACT_PATH) {
  console.log(
    '\n[Ninja] Push Uploads to Staging => Sync configuration values (STAGING_ARTIFACT_PATH) not set. Please edit your .env file! Stopping...\n'
  )
  app.exit()
}

const zipFiles = async () => {
  console.log(`    => Archiving files\n\n`)
  await exec(
    `cd ${localPath} && zip -r -q uploads.zip uploads`,
    (err, stdout) => {
      if (err) {
        console.error(`    => Error log:\n\n${err}`)
        return
      }
      console.log(
        `[Ninja] Push Uploads to Staging => Archving Finished. ${stdout}\n`
      )
      createRemoteFolder()
    }
  )
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
        `[Ninja] Push Uploads to Staging => Remote Folder Created. ${stdout}\n`
      )
      pushToRemote()
    }
  )
}

const pushToRemote = async () => {
  await exec(
    `rsync -chavzP ${localFile} ${remoteUser}@${remoteServer}:${remotePath}/`,
    (err, stdout) => {
      if (err) {
        console.error(`    => Error log:\n\n${err}`)
        return
      }
      console.log(`    => Transfer information\n\n${stdout}`)
      cleanupFiles()
    }
  )
}

const cleanupFiles = async () => {
  console.log(`    => Cleanup files\n\n`)
  await exec(`rm -f ${localFile}`, (err, stdout) => {
    if (err) {
      console.error(`    => Error log:\n\n${err}`)
      return
    }
    console.log(
      `[Ninja] Push Uploads to Staging => Cleanup Finished. ${stdout}\n`
    )
    console.log('[Ninja] Push Uploads to Staging => Finished.\n')
  })
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: `\n[Ninja] Push Uploads to Staging => Overwrite \n    "${remoteServer}:~/${remotePath}/uploads.zip" \n     with \n    "${localFile}"\n\n    WARNING:\n    This will overwrite the staging uploads folder!\n\n    => Do you want to continue? (Y/N)\n`
    })
  }

  // If yes
  if (confirmation) {
    console.log('[Ninja] Push Uploads to Staging => Starting ... \n')
    await zipFiles()
  } else {
    console.log(
      '[Ninja] Push Uploads to Staging => Stopping ... no changes were made. \n'
    )
  }
}

start()
