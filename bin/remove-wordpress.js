'use strict'

const path = require('path')
const fs = require('fs-extra')
const exec = require('child_process').exec

// Removes all WordPress related files
const removeWordpress = async () => {
  return Promise.all([
    fs.remove(path.resolve(__dirname, '../dist-wp')),
    fs.remove(path.resolve(__dirname, '../wordpress')),
    fs.remove(path.resolve(__dirname, '../webpack.wordpress.js')),
    fs.remove(path.resolve(__dirname, '../webpack.wordpress.prod.js')),
    removeTasks()
  ])
}

// Remove WordPress tasks
const removeTasks = async () => {
  exec("sed -i '' '/wp/d' package.json", (err) => {
    if (err) {
      console.error(`    => Error log:\n\n${err}`)
      return
    }
    console.log('[Ninja] Init Project => Removing WordPress tasks...\n')
  })
}

async function start() {
  try {
    await removeWordpress()
    console.log('\n[Ninja] Init Project => Removing WordPress...\n')
  } catch (e) {
    console.log(
      '\n[Ninja] Init Project => Oops, something happened when attempting to remove WordPress files...\n'
    )
  }
}

start()
