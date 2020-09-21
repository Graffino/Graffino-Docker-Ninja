module.exports = {
  plugins: [
    'autoprefixer',
    ['css-mqpacker', ''],
    'postcss-sorting',
    [
      'cssnano',
      {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    ]
  ]
}
