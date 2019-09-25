'use strict'

const fs = require('fs')
const path = require('path')
const semver = require('semver')
var exec = require('child_process').exec
var pkgPath = path.join(__dirname, '..', 'package.json')
const pkg = require(pkgPath)

// Bump type
let bumpType = process.argv[2]

const bump = type => {
  const bumpVersion = semver.inc(pkg.version, type)

  if (!semver.valid(bumpVersion)) {
    console.error(`Invalid version: ${bumpVersion}`)
    process.exit()
  }

  if (semver.gt(bumpVersion, pkg.version)) {
    pkg.version = bumpVersion
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
    console.log(`Publishing new version: ${bumpVersion}`)

    const cmd = [
      'git add package.json',
      `git commit -m "v${bumpVersion}"`
    ].join(' && ')

    exec(cmd, {
      cwd: path.resolve(__dirname, '..')
    }, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error('Failed')
        console.error(err || stderr)
        pkg.version = bumpVersion
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
      } else {
        console.log('Success!')
      }
    })
  }
}

if (bumpType) {
  bumpType = bumpType.replace('--', '')
} else {
  bumpType = 'patch'
}

bump(bumpType)
