'use strict'

const path = require('path')
const replace = require('replace-in-file')
const { parsed: env } = require('dotenv').config()

// Replace style.css theme info
const setupWpStyle = async () => {
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

module.exports = setupWpStyle
