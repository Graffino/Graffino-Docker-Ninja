# Features And Usage

- [Features And Usage](#features-and-usage)
  - [Project Folder Structure](#project-folder-structure)
    - [Handlebars Views Structure](#handlebars-views-structure)
    - [Styles Structure](#styles-structure)
    - [Scripts Structure](#scripts-structure)
    - [Fonts](#fonts)
    - [SVG Sprite](#svg-sprite)
    - [SVG Injection](#svg-injection)
    - [Favicon Generation](#favicon-generation)
    - [Lazy Loading](#lazy-loading)
    - [Responsive Typography](#responsive-typography)
    - [Easy Media Queries](#easy-media-queries)
    - [Helpers & Mix-ins](#helpers--mix-ins)
      - [Helpers](#helpers)
      - [Mix-Ins](#mix-ins)
    - [Linters & Automatic Code Formatters](#linters--automatic-code-formatters)
    - [Form Validation](#form-validation)
    - [Dev Server](#dev-server)
    - [Deployment](#deployment)

## Project Folder Structure

Start by exploring the folder structure and files.

**_src_ folder**:

- **fonts** - Your fonts in WOFF and WOFF2 formats.
- **icons** - SVG icons and decorations that will be included in the SVG sprite.
- **images** - Images with an extra folder for SVGs (to be used for big SVGs that do not belong in a sprite).
- **media** - Place to store other file types.
- **scripts** - All Javascript lives here.
- **static** - Everything placed here will be copied to the _dist_ folder.
- **styles** - Write your CSS in here, following the organized structure provided.
- **views** - Handlebars templates for static HTML are placed here.

### Handlebars Views Structure

By default, Ninja uses handlebars for templating.

- **hepers/** - If you need any helpers you can write them here. Do not remove the _sprite.js_ helper.
- **partials/** - If you're reusing parts of the website, write them here.
- **index.handlebars** - Homepage.
- **page.handlebars** - Secondary page.

When creating a new page you also have to let WebPack know about it in _webpack.config.js_ file.

```javascript
plugins: [
  new HtmlWebpackPlugin({
    title: 'Page Title',
    filename: 'page.html',
    template: './src/views/page.handlebars'
  })
]
```

For more info please check out [Handlebars Loader](https://github.com/pcardune/handlebars-loader) and [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin).

### Styles Structure

Project styles use a modular folder structure. You can read more about this [here](https://vanseodesign.com/css/sass-folder-structures/).

- **base/** - Common boilerplate content.
- **layout/** - Styles of major website sections.
- **modules/** - Styles of page components.
- **pages/** - Styles pf specific pages.
- **utils/** - SASS tools, helpers and mix-ins.
- **vendor** - 3rd party libraries and code.
- **app.scss** - Here's where all the above stuff is imported.

When starting a new project you should begin by changing the variables in _base/\_variables.scss_.

### Scripts Structure

Ninja supports [ES6 syntax](https://github.com/lukehoban/es6features).
It also implements a module structure with auto initialisation of modules.

- **modules/** - Write Custom autoloading JS modules, following the provided module template.
- **utils/** - Additional used code should be placed here.
- **index.js** - Main Webpack entry point.
- **vendor.js** - 3rd party libraries and code.

### Fonts

Fonts need to be placed in _src/fonts_ in both _woff_ and _woff2_ formats.
In _src/styles/base/\_fonts.scss_ the fonts are loaded via the @font-face rule.
The fond loading mixin uses font style linking. Every font and weight added should be declared following the example provided.

### SVG Sprite

Simply place your svg icons in the _src/icons_ folder and the sprite will be generated and injected in the document.
Icons from the sprite can be accessed like this:

```html
<svg class="icon" width="16" height="16">
  <use xlink:href="#icon-name"></use>
</svg>
```

By default, sprite icons are optimized with [SVGO](https://github.com/svg/svgo). Because we're using a cloned instance of the SVG you must remove inline colors from the icons in order to be able to change the sprite icon colors via CSS. The icon's color will be inherited from the parent element.

### SVG Injection

SVGs can also be injected in the document individually. For this write just add `markup-inline` to an `img` tag with the _src_ of the SVG and it will be replaced with a SVG.

```html
<img markup-inline src="../../icons/logo.svg" alt="Logo" />
```

### Favicon Generation

More info about favicons and what can be done with them [here](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/).

You can use this [tool](https://realfavicongenerator.net/) to generate all icon types and sizes from a SVG.
Here you can also check favicons and how they actually look on a live website.

After generating them copy all to _/src/static_

_We could have automated this process, but from our experience, this needs to be done manually. Sorry._

### Lazy Loading

Ninja uses this [LazyLoad library](https://github.com/verlok/lazyload) to load images/videos/iframes as they enter the viewport via the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.

To use this feature just add the attribute `data-src` to your `img` tag.

```html
<img data-src="lazy.jpg" alt="Lazy Loaded image">
```

This library also makes using low quality placeholders possible.

```html
<img src="lazy-lqip.jpg" data-src="lazy.jpg" alt="Lazy Loaded image with LQIP placeholder">
```

For responsive images.

```html
<img alt="Lazy Loaded responsive image" class="lazy"
    data-src="lazy.jpg"
    data-srcset="lazy_400.jpg 400w, lazy_800.jpg 800w"
    data-sizes="100w">
```

Usage with `picture` tag.

```html
<picture>
    <source
        media="(min-width: 1200px)"
        data-srcset="lazy_1200.jpg 1x, lazy_2400.jpg 2x">
    <source
        media="(min-width: 800px)"
        data-srcset="lazy_800.jpg 1x, lazy_1600.jpg 2x">
    <img alt="Lazy Loaded picture" class="lazy"
        data-src="lazy.jpg">
</picture>
```

As a background-image.

```html
<div class="lazy" data-bg="url(lazy.jpg)"></div>
```

For advanced use of this feature check out the library's [docs](https://github.com/verlok/lazyload).

### Responsive Typography

Ninja uses [Typi](https://github.com/zellwk/typi) for responsive typography.
There's a SASS map named `$typi` in _src/styles/base/\_typography.scss_ where global typography variables tell Typi what `font-size` and `line-height` values to create at different media queries.
Typi can also be a helper for Vertical Rhythm.
Check out this [guide](https://zellwk.com/blog/typi/) for a better understanding and advanced use.

### Easy Media Queries

When building a responsive website, writing media queries can be a tedious process.
So we built a set of SASS mix-ins for making this easier for us.
They are pretty self-explanatory.
`below()`, `between()` and `above()`, taking the breakpoint's name as a parameter.

Example usage:

```SCSS
.title {
  text-align: center;

  @include below(tablet) {
    text-align: left;
  }
}
```

Also, we provided a few visibility helper classes to show or hide elements based on screen size.

```SCSS
.h-hide-breakpoint-up {}
.h-hide-breakpoint-down {}
.h-show-breakpoint-up {}
.h-show-breakpoint-down {}
```

_Note: these helpers only work with breakpoints defined in the global SASS variables file._

***

### Helpers & Mix-ins

Ninja comes with some useful helpers and mix-ins designed to make development faster, cleaner and consistent.

#### Helpers

- **.h-responsive-image** - Make image responsive with it's container.
- **.h-visually-hidden** - Hide element visually without removing it.
- **.h-m-_side_-_space_** - Add margins to elements, _side_ should be the side's initial letter and _space_ should range from 0 to 100 in increments of 5. Example: `class="h-m-b-10"`.
- **.h-m-_side_-_space_** - Add padding to elements, _side_ should be the side's initial letter and _space_ should range from 0 to 100 in increments of 5. Example: `class="h-p-r-20"`
- **.h-z-index-_index_** - Add z-index to elements, _index_ should range from 0 to 10.

For more helpers check out _src/styles/utils/\_helpers.scss_

#### Mix-Ins

- **rem(10px)** - Converts pixels to REM based on _$base-font-size_.
- **em(10px)** - Converts pixels to EM based on _$base-font-size_.
- **align-_x|y|xy_** - Aligns element relative to its parent.

For more mix-ins check out _src/styles/utils/\_functions.scss_

### Linters & Automatic Code Formatters

Ninja uses [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) for linting and [Prettier](https://prettier.io) for code formatting.

Their configs can be found in the root of the project. Feel free to configure them according to your preference.

By default, it follows [JavaScript Standard Style](https://standardjs.com) for JS and [SASS Guidelines](https://sass-guidelin.es/) rules for SASS.

For linting and formatting code use the following commands.

```bash
# Lint JavaScript
yarn lint:js

# Lint SASS
yarn lint:scss
```

```bash
# Format JavaScript
yarn fix:js

# Format SASS
yarn fix:scss
```

### Form Validation

We use a tiny form-validation library called [Pristine](https://github.com/sha256/Pristine)
For this all you need to do is add `data-component="validate"` to your form element.
On validating, it will display error messages and the button will shake.

Example:

```html
<form class="form" novalidate method="post" data-component="validate">
  <div class="form__field">
    <input class="form__input" type="email" placeholder="email" required>
  </div>
  <button class="button form__button" type="submit">
    Submit
  </button>
</form>
```

***

### Dev Server

Running the `yarn run dev` command will start a development server.
The default host is **<http://localhost:3000/>**, but you can configure this in `webpack.dev.js`, plus a lot of other [configuration options](https://webpack.js.org/configuration/dev-server/).
You can also have a Virtual Host proxied to the dev server in order to be able to use certificates.

### Deployment

When your website is ready for deployment, use the `yarn build` command.
It will create a `dist` folder where you will find all your assets compressed and optimized.

You can also use git based deployment. Check out the deployment scripts in `package.json`.
