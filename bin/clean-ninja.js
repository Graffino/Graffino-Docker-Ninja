'use strict'

const path = require('path')
const fs = require('fs-extra')

// Clean ninja related files
const cleanFiles = async () => {
  // Clean images, icons and fonts
  await fs.emptyDir(path.resolve(__dirname, '../src/images'))
  await fs.emptyDir(path.resolve(__dirname, '../src/images/svgs'))
  await fs.emptyDir(path.resolve(__dirname, '../src/icons'))
  await fs.emptyDir(path.resolve(__dirname, '../src/fonts'))

  // Clean static folder
  await fs.remove(path.resolve(__dirname, '../src/static/favicon-template.png'))
  await fs.remove(path.resolve(__dirname, '../src/static/favicon.ico'))
  await fs.remove(path.resolve(__dirname, '../src/static/pin-icon.svg'))
  await fs.remove(path.resolve(__dirname, '../src/static/social.jpg'))
  await fs.remove(path.resolve(__dirname, '../src/static/touch-icon.png'))
  await fs.remove(path.resolve(__dirname, '../src/static/touch-startup-image.png'))

  // Remove cypress tests
  await fs.remove(path.resolve(__dirname, '../cypress'))
}

async function start () {
  try {
    await cleanFiles()
    console.log('\n[Ninja] Init Project => cleaning ninja files...\n')
    process.exit(0)
  } catch (e) {
    console.log('\n[Ninja] Init Project => Oops, something happened...\n')
  }
}

start()
