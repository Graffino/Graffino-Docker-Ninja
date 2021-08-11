'use strict'

const yesno = require('yesno')
const path = require('path')
const symlinkDir = require('symlink-dir')

// Create symlink
const createSymlink = async () => {
  console.log('    => Creating symlink repo -> dist...')
  return await symlinkDir(
    path.resolve(__dirname, '../wordpress/uploads/'),
    path.resolve(__dirname, '../dist-wp/wp-content/uploads')
  )
    .then(console.log('    => Symlink has been created...'))
    .catch((err) => console.error(err))
    .then(console.log('    => Syncing from repo to dist finished...'))
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question:
        '\n[Ninja] Symlink Uploads => Creates a symlink from repo uploads folder -> wp-dist uploads folder.\n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Symlink Uploads => Creates a symlink from WordPress uploads -> wp-dist uploads folder (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    // Wait for sync
    try {
      await Promise.all(createSymlink())
      console.log('\n[Ninja] Symlink Uploads => Finished.\n')
    } catch (e) {
      console.log('\n[Ninja] Symlink Uploads => No symlink can be created.\n')
    }
  } else {
    console.log(
      '\n[Ninja] Symlink Uploads => Stopping ... no changes were made.\n'
    )
  }
}

start()
