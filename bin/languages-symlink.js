'use strict'

const yesno = require('yesno')
const path = require('path')
const symlinkDir = require('symlink-dir')

// Create symlink
const createSymlink = async () => {
  console.log('    => Creating symlink repo -> dist...')
  return await symlinkDir(
    path.resolve(__dirname, '../wordpress/languages/'),
    path.resolve(__dirname, '../dist-wp/wp-content/languages')
  )
    .then(console.log('    => Symlink has been created...'))
    .catch((err) => {
      console.log(
        `\n[Ninja] Symlink Languages => No symlink can be created.${err}\n`
      )
    })
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question:
        '\n[Ninja] Symlink Languages => Creates a symlink from repo languages folder -> wp-dist languages folder.\n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Symlink Languages => Creates a symlink from WordPress languages -> wp-dist languages folder (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    // Wait for sync
    await createSymlink()
    console.log('\n[Ninja] Symlink Languages => Finished.\n')
  } else {
    console.log(
      '\n[Ninja] Symlink Languages => Stopping ... no changes were made.\n'
    )
  }
}

start()
