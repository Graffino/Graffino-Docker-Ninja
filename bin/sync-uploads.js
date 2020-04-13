'use strict'

const yesno = require('yesno')
const path = require('path')
const cpy = require('cpy')

// Copy files
const copyTo = async () => {
  console.log('    => Syncing files from dist to repo...')
  return await cpy(['**/*'], path.resolve(__dirname, '../wordpress/uploads/'), {
    cwd: path.resolve(__dirname, '../dist-wp/wp-content/uploads/'),
    overwrite: false,
    parents: true
  }).then(console.log('    => Syncing from dist to repo finished.'))
}

// Copy files
const copyFrom = async () => {
  console.log('    => Syncing files from repo to dist...')
  return await cpy(
    ['**/*'],
    path.resolve(__dirname, '../dist-wp/wp-content/uploads'),
    {
      cwd: path.resolve(__dirname, '../wordpress/uploads/'),
      overwrite: false,
      parents: true
    }
  ).then(console.log('    => Syncing from repo to dist finished...'))
}

// Start async
async function start () {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question:
        '\n[Ninja] Sync Uploads => Syncs repo uploads folder with wp-dist uploads folder.\n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Sync Uploads =>  Syncs WordPress uploads with wp-dist uploads folder (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    // Wait for sync
    try {
      await Promise.all([copyTo(), copyFrom()])
      console.log('\n[Ninja] Sync Uploads => Syncing finished.\n')
    } catch (e) {
      console.log(
        '\n[Ninja] Sync Uploads => No sync possible. Make sure yarn wp:setup has been executed.\n'
      )
    }
  } else {
    console.log(
      '\n[Ninja] Sync Uploads => Stopping ... no changes were made.\n'
    )
  }
}

start()
