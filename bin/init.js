'use strict'

const path = require('path')
const fs = require('fs-extra')
const replace = require('replace-in-file')
const packageJson = require('../package.json')
const { promptUserForInfo } = require('./init-info')
const initRepo = require('./init-repo')
const siteManifest = fs.readJsonSync(path.resolve(__dirname, '../src/static/site.webmanifest'))

const configureSiteManifest = async () => {
  siteManifest.name = packageJson.title
  const nameParts = packageJson.title.split(' ')
  siteManifest.short_name = nameParts[nameParts.length - 1] // Last part of the name
  siteManifest.start_url = packageJson.homepage

  return fs.writeJson(path.resolve(__dirname, '../src/static/site.webmanifest'), siteManifest, {
    spaces: 2
  })
}

const replaceNameInWebpack = async () => {
  return replace(
    {
      files: [path.resolve(__dirname, '../webpack.config.js')],
      from: /Ninja/ig,
      to: packageJson.title,
      countMatches: true
    },
    (error, results) => {
      if (error) {
        return console.error('Error occurred:', error)
      }
      console.log('Replacement results:', results)
    }
  )
}

async function start() {
  try {
    // await initRepo()
    await promptUserForInfo()
    await Promise.all([configureSiteManifest(), replaceNameInWebpack()])

    if (packageJson.isWordpress) {
      const setupWp = require('./init-wp')
      await setupWp()
    } else {
      const setupStatic = require('./init-static')
      await setupStatic()
    }

    console.log('\n[Ninja] Init Project => Project initialized!\n')
    process.exit(0)
  } catch (e) {
    console.log('\n[Ninja] Init Project => Oops, something happened...\n')
    console.log(e.message)
  }
}

start()
