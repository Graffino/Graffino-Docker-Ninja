'use strict'

const path = require('path')
const replace = require('replace-in-file')
const { parsed: env } = require('dotenv').config()

// Replace style.css theme info
const searchAndReplace = async () => {
  return replace(
    {
      files: [path.resolve(__dirname, '../wordpress/theme/style.css')],
      from: [/Theme Name:\s.+\s/, /Theme URI:\s.+\n/, /Version:\s.+\s/],
      to: [
        `Theme Name: ${env.THEME_NAME}\n`,
        `Theme URI: ${env.THEME_URL}\n`,
        'Version: 0.0.0\n'
      ],
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
    await Promise.all([searchAndReplace()])
    console.log('\n[Ninja] Init Project => Project initialized!\n')
    process.exit(0)
  } catch (e) {
    console.log('\n[Ninja] Init Project => Oops, something happened...\n')
  }
}

start()
