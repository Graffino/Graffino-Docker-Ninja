'use strict'

const path = require('path')
const fs = require('fs-extra')
const packageJson = require('../package.json')
const git = require('simple-git')()

const initRepo = async () => {
  // Remove .git
  await fs.remove(path.resolve(__dirname, '../.git'))

  // Initialize repository
  try {
    await git.init().addRemote('origin', packageJson.repository)
    console.log('\n[Ninja] Init Project => Repositiory initialized!\n')
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = initRepo
