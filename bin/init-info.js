'use strict'

const path = require('path')
const fs = require('fs-extra')
const prompts = require('prompts')
const packageJson = require('../package.json')

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const promptUserForInfo = async () => {
  const pathComponents = __dirname.split('/')
  const projectfolderName = pathComponents[
    pathComponents.length - 2
  ].toLocaleLowerCase()

  const generalQuestions = [
    {
      type: 'text',
      name: 'name',
      initial: projectfolderName,
      format: (val) =>
        val
          .replace(/^[.,_]/, '')
          .replace(/[ ]/g, '-')
          .toLowerCase(), // format required by package.json
      message: 'What is the name of the project?'
    },
    {
      type: 'text',
      name: 'repository',
      initial: (prev, values) => {
        const gitHubRepo = values.name.toLowerCase().replace(/[ ]/g, '-')
        return `git@github.com:Graffino/${gitHubRepo}.git`
      },
      message: 'What is the Github repo of the project?'
    },
    {
      type: 'text',
      name: 'homepage',
      initial: (prev, values) => {
        return `https://${values.name.toLowerCase()}.graffino.dev`
      },
      message: 'What is the base url of the project?'
    },
    {
      type: 'text',
      name: 'title',
      initial: (prev, values) => {
        return `${capitalize(
          values.name
            .replace(/^[^a-zA-Z]/, '')
            .replace(/[^a-zA-Z]$/, '')
            .replace(/[-]/g, ' ')
        )}`
      },
      message: 'What is the title of the project?'
    },
    {
      type: 'text',
      name: 'description',
      initial: (prev, values) => {
        return `${values.title}, made with love by Graffino`
      },
      message: 'What is the description of the project?'
    },
    {
      type: 'confirm',
      name: 'isWordpress',
      message: 'Will you be using wordpress for this project?'
    }
  ]

  const generalProjectInfo = await prompts(generalQuestions)

  for (const property in generalProjectInfo) {
    packageJson[property] = generalProjectInfo[property]
  }
  packageJson.version = '1.0.0'

  await fs.writeJson(path.resolve(__dirname, '../package.json'), packageJson, {
    spaces: 2
  })

  console.log('\n[Ninja] Init Project => Overwriting package.json...\n')

  if (generalProjectInfo.isWordpress) {
    setUpEnv()
  }
}

const setUpEnv = async () => {
  const envQuestions = [
    {
      type: 'text',
      name: 'THEME_NAME',
      initial: packageJson.title,
      message: 'What is the name of your WordPress theme?'
    },
    {
      type: 'text',
      name: 'THEME_URL',
      initial: (prev, values) => {
        return `https://${values.THEME_NAME.replace(
          /[ ]/g,
          '-'
        ).toLowerCase()}.graffino.dev`
      },
      message: 'What is the homepage url of your WordPress theme?'
    },
    {
      type: 'text',
      name: 'DB_HOST',
      message: 'Database host:'
    },
    {
      type: 'text',
      name: 'DB_USER',
      message: 'Database user:'
    },
    {
      type: 'text',
      name: 'DB_PASSWORD',
      message: 'Database password:'
    },
    {
      type: 'text',
      name: 'PLUGIN_ACF_KEY',
      message: 'WordPress Advanced Custom Fields plugin key:'
    },
    {
      type: 'text',
      name: 'PLUGIN_WPML_ID',
      message: 'Multi Language WordPpress ID:'
    },
    {
      type: 'text',
      name: 'PLUGIN_WPML_KEY',
      message: 'Multi Language WordPress key:'
    },
    {
      type: 'confirm',
      name: 'DEBUG',
      initial: true,
      message: 'Enable debugging?'
    }
  ]

  const envInfo = await prompts(envQuestions)
  const { stringify } = require('envfile')

  await fs.outputFile(path.resolve(__dirname, '../.env'), stringify(envInfo))
  console.log('\n[Ninja] Init Project => Creating .env...\n')
}

promptUserForInfo()
