# Ninja

The coolest boilerplate you've ever seen in your whole life.

All up in the interwebs, world wide!

2019, futuristic.

_Enter the Ninja_

The feature packed, lightning fast boilerplate we use at [Graffino](https://graffino.com/) for building modern responsive websites.

Check out this [wiki](https://github.com/Graffino/Ninja/wiki) for more information.

## Getting Started

You need [git](https://git-scm.com/), [node](https://nodejs.org/) and [yarn](https://yarnpkg.com) on your computer before running.

```Bash
# Clone Project
git clone https://github.com/graffino/ninja.git
cd ninja

# Initialize New Git Workspace
rm -rf .git
git init

# Install Dependencies
yarn install

# Start Dev Server
yarn run dev
```

## Features

- ES6 transpiling
- SCSS and PostCSS
- Handlebars Templating
- Flexbox Grid System
- Development Server
- Asset Compression
- Favicon Generation
- SVG Sprite Generation
- Sourcemaps
- Webpack Config Split

## Tests
[hermione.js](https://github.com/gemini-testing/hermione) is a testing framework developed a
https://mochajs.org/

Is based on [mochajs](https://mochajs.org/) and uses [chai.js](https://www.chaijs.com/) for assertions.

1. Run `yarn test:setup`
2. Run `yarn test`

Regression testing requires that you have previously 'approved' the desired design.
You can do so by running `yarn test:approve`
