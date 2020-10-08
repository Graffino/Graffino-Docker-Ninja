'use strict'

const path = require('path')
const fs = require('fs-extra')
const replace = require('replace-in-file')
const { parsed: env } = require('dotenv').config()

// Replace style.css theme info
const searchAndReplace = async () => {
  return replace(
    {
      files: [
        path.resolve(__dirname, '../wordpress/theme/style.css')
      ],
      from: [/Theme Name:\s.+\s/, /Theme URI:\s.+\n/, /Version:\s.+\s/],
      to: [`Theme Name: ${env.THEME_NAME}\n`, `Theme URI: ${env.THEME_URL}\n`, 'Version: 0.0.0\n'],
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

// Clean files
const cleanFiles = async () => {
  // Remove all partials but header and footer
  await Promise.all([
    fs.remove(path.resolve(__dirname, '../src/views/partials/hero.handlebars')),
    fs.remove(path.resolve(__dirname, '../src/views/partials/features.handlebars')),
    fs.remove(path.resolve(__dirname, '../src/views/partials/setup.handlebars'))
  ])

  await fs.outputFile(
    path.resolve(__dirname, '../src/views/index.handlebars'),
    `{{> header}}
  <h1 class="heading h1">{{package 'name'}}</h1>
  <p class="text">{{package 'description'}}</p>
{{> footer}}`
  )

  await fs.outputFile(
    path.resolve(__dirname, '../src/views/404.handlebars'),
    `{{> header}}
  <h1 class="heading h1">Page not found 404</h1>
{{> footer}}`
  )
}

async function start () {
  try {
    await Promise.all([searchAndReplace(), cleanFiles()])
    console.log('\n[Ninja] Init Project => Project initialized!\n')
    process.exit(0)
  } catch (e) {
    console.log('\n[Ninja] Init Project => Oops, something happened...\n')
  }
}

start()
