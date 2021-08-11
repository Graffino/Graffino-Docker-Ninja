'use strict'

const fs = require('fs-extra')
const path = require('path')
const { stringify } = require('envfile')
const { parsed: env } = require('dotenv').config()
const packageJson = require('../package.json')

const writeVersionToEnv = async () => {
  const version = { WP_SENTRY_VERSION: packageJson.version }

  for (const propery in version) {
    env[propery] = version[propery]
  }

  await fs.outputFile(path.resolve(__dirname, '../.env'), stringify(env))
}

writeVersionToEnv()
