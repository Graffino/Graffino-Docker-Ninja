'use strict'

const yesno = require('yesno')
const path = require('path')
const fse = require('fs-extra')

// Clean files
const cleanWP = async () => {
  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/themes/twentysixteen/')
  )
  console.log('    => Twentysixteen theme removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/themes/twentyseventeen/')
  )
  console.log('    => Twentyseventeen theme removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/themes/twentynineteen/')
  )
  console.log('    => Twentynineteen theme removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/themes/twentytwenty/')
  )
  console.log('    => Twentytwenty theme removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/themes/twentytwentyone/')
  )
  console.log('    => Twentytwenty-one theme removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/themes/twentytwentytwo/')
  )
  console.log('    => Twentytwenty-two theme removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/plugins/akismet/')
  )
  console.log('    => Akismet removed...')

  await fse.remove(
    path.resolve(__dirname, '../dist-wp/wp-content/plugins/hello.php')
  )
  console.log('    => Hello Dolly removed...')
}

// Start async
async function start() {
  // Implement confirmation
  let confirmation = true

  if (process.argv[2] !== '--no-confirm') {
    confirmation = await yesno({
      question:
        '\n[Ninja] Clean WP => Clean WordPress default files\n\n    WARNING:\n    Cleaning removes default WordPress themes and plugins. \n\n    => Do you want to continue? (Y/N)\n'
    })
  } else {
    console.log(
      '\n[Ninja] Clean WP => Clean WordPress fildefault files (--no-confirm)\n'
    )
  }

  // If yes
  if (confirmation) {
    console.log('    => Cleaning WP install ...\n')
    await cleanWP()
    console.log('\n[Ninja] Clean WP => Cleaning finished.\n')
  } else {
    console.log('\n[Ninja] Clean WP => Stopping ... no changes were made. \n')
  }
}

start()
