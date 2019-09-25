'use strict'

const yesno = require('yesno')
const path = require('path')
const fse = require('fs-extra')

// Copy files
const copy = async () => {
  console.log('(1) Cleaning WP install ...')

  fse.remove(path.resolve(__dirname, '../dist-wp/wp-content/themes/twentysixteen/'), () => {
    console.log('Twentysixteen theme removed...')
  })

  fse.remove(path.resolve(__dirname, '../dist-wp/wp-content/themes/twentyseventeen/'), () => {
    console.log('Twentyseventeen theme removed...')
  })

  fse.remove(path.resolve(__dirname, '../dist-wp/wp-content/themes/twentynineteen/'), () => {
    console.log('Twentynineteen theme removed...')
  })

  fse.remove(path.resolve(__dirname, '../dist-wp/wp-content/plugins/akismet/'), () => {
    console.log('Akismet removed...')
  })

  fse.remove(path.resolve(__dirname, '../dist-wp/wp-content/plugins/hello.php'), () => {
    console.log('Hello Dolly removed...')
  })
}

// Start async
async function start () {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: 'WARNING: Cleaning removes default WP themes and plugins. Do you want to continue?\n'
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
