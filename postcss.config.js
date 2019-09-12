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
  ]
}
