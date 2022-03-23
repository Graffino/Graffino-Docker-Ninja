# WordPress Theme Development

Ninja also includes a WordPress theme development workflow.
This feature was designed to be separate from the frontend stuff.

- [WordPress Theme Development](#wordpress-theme-development)
  - [Prerequisites](#prerequisites)
  - [First Steps](#first-steps)
  - [Theme Development](#theme-development)
  - [Plugin Installation](#plugin-installation)
  - [Database Dump](#database-dump)
  - [Database Migration](#database-migration)
  - [Sprite Icons](#sprite-icons)

## Prerequisites

1. First of all you'll need [Composer](https://getcomposer.org/) installed globally on your system.
2. You'll also need [MariaDB](https://mariadb.org/) and an [Apache](https://httpd.apache.org/) server running on your computer.
3. Or you need to use the provided Docker environment.

## First Steps

Copy the `.env.example` found in the project root as `.env` and enter your variables.

Example:

```bash
THEME_NAME = ninja-theme
THEME_URL = https://ninja.graffino.dev


DB_HOST = localhost
DB_NAME = ninja
DB_USER = root
DB_PASSWORD =

DB_MIGRATION = latest

PLUGIN_ACF_KEY =

DEBUG = true
```

For `THEME_URL`, you need to provide an existing virtual host and Browsersync will wrap it with a proxy URL to view your website.

For `PLUGIN_ACF_KEY`, you need to provide a license for [Advanced Custom Fields](https://www.advancedcustomfields.com) plugin. It will install automatically. If you don't need it, you may remove it from `composer.json`.

After configuring the environment variables just run
`yarn wp:setup`

This will install WordPress in the `dist-wp` folder, create your database if it doesn't exist yet and setup the paths.

## Theme Development

The source code for the theme is in the `wordpress/theme` folder.
For SCSS just write them in the `src` folder as you would normally do developing a normal website.

To start the dev server run `yarn wp`

## Plugin Installation

To install a WordPress plugin, first go to <https://wpackagist.org/> and search for it, then install it like this

```bash
composer require wpackagist-plugin/plugin-name
```

Private (Premium) plugin support is available via [Private Composer Installer](https://github.com/ffraenz/private-composer-installer). This way, you can a premium plugin via Composer, and store its license code in the `.env` file. This way your license is not being exposed.

## Database Dump

We included a dump command so you have version control for your database.

To do this run `yarn  wp:db:dump`

Your migration will be stored in `wordpress/migrations` with its timestamp, and also the last one will also be saved as `latest`.

## Database Migration

To do a migration, first change the `DB_MIGRATION` variable in your `.env` file to the name of the previously generated database migration, or just leave it to the default `latest`.
Then run `yarn wp:db:migrate`.

## Sprite Icons

To use an icon from the spritesheet in the theme just insert this snippet.

`<?php NWP_Images::inject_svg( 'icon-name' ); ?>`

The icons should be present in _src/icons_
