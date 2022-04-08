# Ninja

The feature packed, lightning fast boilerplate we use at [Graffino](https://graffino.com/) for building modern responsive static and WordPress powered websites.

- [Ninja](#ninja)
  - [Features](#features)
    - [Modern CSS](#modern-css)
    - [ES6 vanilla JS, VueJS](#es6-vanilla-js-vuejs)
    - [Assets](#assets)
    - [or WordPress (PHP) powered](#or-wordpress-php-powered)
    - [Regression testing](#regression-testing)
    - [Toolset](#toolset)
  - [Features And Usage](#features-and-usage)
  - [Default Password](#default-password)
  - [Important](#important)

## Features

### Modern CSS

- SCSS powered
- Easy media queries
- PostCSS optimisation via browserlist
- Code minification
- Custom Flexbox grid system
- Custom mixins & utilities
- Responsive typography
- Automatic code linting and fixing
- Sourcemaps

### ES6 vanilla JS, VueJS

- Vanilla JS modules
- ES6 transpiling via babel with browserlist support
- Babel polyfills support
- Code minification & optimisation
- Automatic code linting and fixing
- Sourcemaps
- VSCode debug support
- Webpack build

### Assets

- NodeJS assets via package.json, you won't manually download a library ever again
- SVG sprites for modern dynamic SVG icons and assets
- SVG inline injection
- Image assets compression & optimisation
- Lazy loading & low resolution placeholders

### or WordPress (PHP) powered

- Composer integration for WordPress and plugins
- Support for private packages and .env based configuration for license keys
- Custom OOP base theme with automatic class loading and dependency injection
- Cache busting support
- Automatic code linting and fixing
- VSCode debug support via xDebug

### Regression testing

- Regression testing via Cypress and Backstop

### Toolset

- Optional dockerized development environment
- Custom SSL certificate support for .dev domain
- One command WordPress setup and initialization
- Database migration & dump scripts for WordPress
- Automatic javascript and composer packages update scripts
- Automatic deployment scripts
- Automatic file syncronisation scripts (WordPress)
- Automatic package version bumping
- Development server with code injection and hot reload

## Features And Usage

To find out more about what Ninja's features and project structure see the `documentation` folder.

## Default Password

```bash
username: graffino
password: js#O^P#S3CYp$SpwIu

## Important

- Keep the version for the imagemin-mozjpeg plugin at 9.0.0 as it is now ESM only.
- Keep the version for eslint plugin at 7.32.0 as prettier-eslint is not compatible with eslint 8.0 yet: <https://github.com/prettier/prettier-eslint/pull/696>.
- PHP linting issue with PHP8: <https://github.com/squizlabs/PHP_CodeSniffer/issues/3196>
- Backstop temporarily removed from `package.json` as it is not compatible with Arm64: `"backstopjs": "^6.0.4"`
