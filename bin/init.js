'use strict'

const path = require('path')
const fs = require('fs-extra')
const replace = require('replace-in-file')
const pjson = require('../package.json')

const searchAndReplace = async () => {
  const projectName = pjson.name

  await replace(
    {
      files: [
        path.resolve(__dirname, '../src/static/site.webmanifest'),
        path.resolve(__dirname, '../webpack.config.js')
      ],
      from: [/ninja/g, /Ninja/g, /Graffino Ninja/g],
      to: projectName
    },
    (error, results) => {
      if (error) {
        return console.error('Error occurred:', error)
      }
    }
  )

  await fs.outputFile(
    path.resolve(__dirname, '../src/views/index.handlebars'),
    `{{> layout/header}}
{{> layout/footer}}`
  )
}

async function start() {
  console.log(pjson)
  try {
    await Promise.all([searchAndReplace()])
    console.log('\n[Ninja] Init Project => Project initialized!\n')
    process.exit(0)
  } catch (e) {
    console.log('\n[Ninja] Init Project => Oops, something happened...\n')
  }
}

start()
