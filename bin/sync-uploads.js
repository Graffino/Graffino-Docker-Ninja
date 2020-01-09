'use strict'

const yesno = require('yesno')
const path = require('path')
const cpy = require('cpy')

// Copy files
const copy = async () => {
  console.log('(1) Syncing files...')

  await cpy(['**/*'],
    path.resolve(__dirname, '../dist-wp/wp-content/uploads/'),
    {
      cwd: path.resolve(__dirname, '../wordpress/uploads/'),
      overwrite: false,
      parents: true
    }
  )
  console.log('(2) Files synced.')
}

// Start async
async function start () {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: 'WARNING: The repository Uploads folder will be synced with your local Uploads folder! Are you sure you want to continue?\n'
    })
  }

  // If yes
  if (confirmation) {
    // Wait for unarchive to finish
    await copy()
  } else {
    console.log('Stopping ... no changes were made. \n')
  }
}

start()
