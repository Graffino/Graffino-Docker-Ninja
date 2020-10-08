'use strict'

const fs = require('fs')
const path = require('path')
const semver = require('semver')
const exec = require('child_process').exec
const pkgPath = path.join(__dirname, '..', 'package.json')
const pkg = require(pkgPath)
const yesno = require('yesno')

const bump = (version) => {
  if (!semver.valid(version)) {
    console.error(`    => Invalid version: ${version}`)
    process.exit()
  }

  if (semver.gt(version, pkg.version)) {
    pkg.version = version
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
    console.log(`    => Publishing new version: ${version}`)

    const cmd = [
      'git add package.json',
      `git commit -m "Bumping to: v${version}"`
    ].join(' && ')

    exec(
      cmd,
      {
        cwd: path.resolve(__dirname, '..')
      },
      (err, stdout, stderr) => {
        if (err || stderr) {
          console.error(
            `\n[Ninja] Bump => Bumping to version v${version} failed.`
          )
          console.error(err || stderr)
          pkg.version = version
          fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
        } else {
          console.log(
            `\n[Ninja] Bump => Bumping to version v${version} successfull.\n`
          )
        }
      }
    )
  }
}

// Start async
async function start() {
  // Get bump type & version
  const type = process.argv[2] ? process.argv[2].replace('--', '') : 'patch'
  const version = semver.inc(pkg.version, type)

  // Implement confirmation
  let confirmation = true

  if (process.argv[3] !== '--no-confirm') {
    confirmation = await yesno({
      question: `\n[Ninja] Bump => Bumping to version: v${version} \n\n    => Do you want to continue? (Y/N)\n`
    })
  } else {
    console.log(
      `\n[Ninja] Bump => Bumping to version: v${version} (--no-confirm)\n`
    )
  }

  // If yes
  if (confirmation) {
    // Wait for unarchive to finish
    bump(version)
  } else {
    console.log('\n[Ninja] Bump => Stopping ... no changes were made. \n')
  }
}

start()
