module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker')(),
    require('postcss-sorting'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
    // purgecss({
    //   content: ['./**/*.handlebars'],
    //   css: ['./**/*.scss'],
    //   whitelistPatterns: [/^is-/, /^has-/, /^animation-/, /^debug/],
    //   whitelistPatternsChildren: [],
    //   keyframes: true
    // })
  ]
}
