const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require("css-mqpacker")(),
    require('cssnano')({
      preset: 'default'
    }),
    purgecss({
      content: ['./**/*.handlebars'],
      css: ['./**/*.scss'],
      whitelistPatterns: [/^is-/, /^has-/, /^animation-/, /^debug/],
      whitelistPatternsChildren: [],
      keyframes: true
    })
  ]
}
