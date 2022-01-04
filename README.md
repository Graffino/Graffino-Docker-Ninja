# Ninja

The feature packed, lightning fast boilerplate we use at [Graffino](https://graffino.com/) for building modern responsive static and WordPress powered websites.

![Ninja dancing](https://media.giphy.com/media/kdmdZpJUqlMiI/giphy.gif)

- [Ninja](#ninja)
  - [Features](#features)
    - [Modern CSS](#modern-css)
    - [ES6 vanilla JS](#es6-vanilla-js)
    - [Assets](#assets)
    - [Static](#static)
    - [or WordPress (PHP) powered](#or-wordpress-php-powered)
    - [Regression testing](#regression-testing)
    - [Toolset](#toolset)
  - [Prerequisites](#prerequisites)
  - [Features And Usage](#features-and-usage)
  - [Vanilla Javascript Compoments](#vanilla-javascript-compoments)
  - [Regression Testing](#regression-testing-1)
  - [WordPress Theme Development](#wordpress-theme-development)
  - [Docker environment](#docker-environment)
  - [Other tools](#other-tools)
  - [Default Password](#default-password)

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

### ES6 vanilla JS

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

### Static

- Handlebars templating system
- Custom mixins
- Cache busting support

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

## Prerequisites

To install required software: <https://github.com/Graffino/Ninja/tree/master/documentation/prerequisites.md>

## Features And Usage

To find out more about what Ninja's features and project structure: <https://github.com/Graffino/Ninja/tree/master/documentation/features-and-usage.md>

## Vanilla Javascript Compoments

How to use Ninja's vanilla JS compoments: <https://github.com/Graffino/Ninja/tree/master/documentation/javascript-components.md>

## Regression Testing

Ninja includes regression testing utilities that help you find out if you broke already developed components: <https://github.com/Graffino/Ninja/tree/master/documentation/regression-testing.md>

## WordPress Theme Development

Info about Ninja's WordPress theme development toolset: <https://github.com/Graffino/Ninja/tree/master/documentation/wordpress-theme-development.md>

## Docker environment

Ninja comes with an optional Docker environment: <https://github.com/Graffino/Ninja/tree/master/documentation/docker-environment.md>

## Other tools

We bundled some other cool scripts and tools into Ninja: <https://github.com/Graffino/Ninja/tree/master/documentation/other-tools.md>

## Default Password

```bash
username: graffino
password: js#O^P#S3CYp$SpwIu
```

Keep the version for the eslint plugin at 7.32: <https://github.com/prettier/prettier-eslint-cli/issues/427>

Keep the version for the imagemin-mozjpeg plugin at 9.0: <https://github.com/imagemin/imagemin/issues/380>
