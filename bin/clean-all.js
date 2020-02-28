'use strict'

const yesno = require('yesno')
const path = require('path')
const fse = require('fs-extra')

// Copy files
const copy = async () => {
  console.log('(1) Cleaning WP install ...')

  fse.remove(path.resolve(__dirname, '../dist-wp/'), () => {
    console.log('Wordpress dist folder removed...')
  })

  fse.remove(path.resolve(__dirname, '../dist/'), () => {
    console.log('HTML dist folder removed...')
  })

  fse.remove(path.resolve(__dirname, '../cache/'), () => {
    console.log('Cache folder removed...')
  })

  fse.remove(path.resolve(__dirname, '../node_modules/'), () => {
    console.log('Node modules removed ...')
  })

  fse.remove(path.resolve(__dirname, '../composer/'), () => {
    console.log('Composer packages removed ...')
  })
}

// Start async
async function start () {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question: 'WARNING: Cleaning all removes all temporary files, Composer & Node packages, Wordpress installation, including the Uploads folder. Make sure to run `wp:sync` first! \nDo you want to continue?\n'
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
