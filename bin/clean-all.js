'use strict'

const yesno = require('yesno')
const path = require('path')
const fse = require('fs-extra')

// Clean files
const clean = async () => {
  await fse.remove(path.resolve(__dirname, '../dist-wp/'))
  console.log('    => WordPress dist folder removed...')

  await fse.remove(path.resolve(__dirname, '../cache/'))
  console.log('    => Cache folder removed...')

  await fse.remove(path.resolve(__dirname, '../node_modules/'))
  console.log('    => Node modules removed ...')

  await fse.remove(path.resolve(__dirname, '../composer/'))
  console.log('    => Composer packages removed ...')
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question:
        '\n[Ninja] Clean All => Clean all temporary files\n\n    WARNING:\n    Cleaning all removes all temporary files, \n    Composer & Node packages, WordPress installation.\n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Clean All => Clean all temporary files (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    console.log('    => Cleaning all temporary files ...\n')
    await clean()
    console.log('\n[Ninja] Clean All => Cleaning finished.\n')
  } else {
    console.log('\n[Ninja] Clean All => Stopping ... no changes were made. \n')
  }
}

start()
