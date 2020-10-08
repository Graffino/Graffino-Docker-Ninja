'use strict'

const path = require('path')
const fs = require('fs-extra')

// Removes all wordpress related files
const removeWordpress = async () => {
  return Promise.all([
    fs.remove(path.resolve(__dirname, '../dist-wp')),
    fs.remove(path.resolve(__dirname, '../wordpress')),
    fs.remove(path.resolve(__dirname, '../webpack.wordpress.js')),
    fs.remove(path.resolve(__dirname, '../webpack.wordpress.prod.js'))
  ])
}

async function start () {
  try {
    await removeWordpress()
    console.log('\n[Ninja] Init Project => Removing wordpress...\n')
  } catch (e) {
    console.log('\n[Ninja] Init Project => Oops, something happened when attempting to remove wordpress files...\n')
  }
}

start()
