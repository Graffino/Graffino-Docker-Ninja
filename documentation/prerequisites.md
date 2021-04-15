# Prerequisites

1. Explore the folder structure and files.
2. For a better experience we recommend writing [Handlebars](http://handlebarsjs.com) and [SASS](https://sass-lang.com/guide), but it works just fine with HTML and CSS.
3. Ninja uses [webpack](https://webpack.js.org) to bundle your assets, which also allows having a split config for development and production.
4. You need [git](https://git-scm.com/), [node](https://nodejs.org/) and [yarn](https://yarnpkg.com) on your computer before running it.

## How to install

```Bash
# Clone Project
git clone https://github.com/graffino/ninja.git
cd ninja

# Initialize New Git Workspace
rm -rf .git
git init

# Install Dependencies
yarn install

# Initialize static project or WordPress project
yarn init
# or
yarn wp:init

# Start Dev Server
yarn dev
# or
yarn wp
```
