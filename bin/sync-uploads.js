'use strict'

const yesno = require('yesno')
const path = require('path')
const cpy = require('cpy')

// Copy files
const copyTo = async () => {
  console.log('(1) Syncing files from dist to repo...')
  return await cpy(['**/*'],
    path.resolve(__dirname, '../wordpress/uploads/'),
    {
      cwd: path.resolve(__dirname, '../dist-wp/wp-content/uploads/'),
      overwrite: false,
      parents: true
    }
  ).then(
    console.log('(2) Files synced to repo.')
  )
}

// Copy files
const copyFrom = async () => {
  console.log('(3) Syncing files from repo to dist...')
  return await cpy(['**/*'],
    path.resolve(__dirname, '../dist-wp/wp-content/uploads'),
    {
      cwd: path.resolve(__dirname, '../wordpress/uploads/'),
      overwrite: false,
      parents: true
    }
  ).then(
    console.log('(4) Files synced to dist.')
  )
}

// Start async
async function start () {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: 'WARNING: The repository Uploads folder will be synced with your dist Uploads folder! Are you sure you want to continue?\n'
    })
  }

  // If yes
  if (confirmation) {
    // Wait for sync
    await Promise.all([copyTo(), copyFrom()])
  } else {
    console.log('Stopping ... no changes were made. \n')
  }
}

start()
