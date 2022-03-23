# Prerequisites

1. Explore the folder structure and files.
2. Project uses [webpack](https://webpack.js.org) to bundle your assets, which also allows having a split config for development and production.
3. You need [git](https://git-scm.com/), [node](https://nodejs.org/) and [yarn](https://yarnpkg.com) on your computer before running it.

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

# Initialize WordPress project
yarn wp:init

# Run it
yarn wp
```
