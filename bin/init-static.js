
const replace = require('replace-in-file')
const path = require('path')
const fs = require('fs-extra')

// Clean handlebars files
const cleanHandlebars = async () => {
  // Remove all partials but header and footer
  await Promise.all([
    fs.remove(path.resolve(__dirname, '../src/views/partials/hero.handlebars')),
    fs.remove(
      path.resolve(__dirname, '../src/views/partials/features.handlebars')
    ),
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

const start = async () => {
  cleanHandlebars()

  // Remove php related files
  await Promise.all([
    fs.remove(path.resolve(__dirname, '../phpcs.xml')),
    fs.remove(path.resolve(__dirname, '../composer.json')),
    fs.remove(path.resolve(__dirname, '../composer.lock'))
  ])
}
