const path = require('path')
const glob = require('glob-all')
const merge = require('webpack-merge')
const common = require('./webpack.wordpress.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new PurgecssPlugin({
      paths: glob.sync(
        [
          path.join(__dirname, './src/**/*.html'),
          path.join(__dirname, './src/**/*.handlebars'),
          path.join(__dirname, './src/**/*.js'),
          path.join(__dirname, './src/**/*.vue'),
          path.join(__dirname, './wordpress/**/*.php')
        ],
        { nodir: true }
      ),
      extractors: [
        {
          extractor: (content) => content.match(/[A-z0-9-:/]+/g) || [],
          extensions: ['handlebars', 'html', 'js', 'php', 'vue']
        }
      ],
      whitelistPatterns: [
        /^is-/,
        /^has-/,
        /^animation-/,
        /^debug/,
        /^h-/,
        /^d-/,
        /^nav/,
        /^-nav/,
        /^-submenu/,
        /^submenu/,
        /^nwp-/,
        /^post-/,
        /^page-/,
        /^slide-/,
        /^icon/,
        /^noUi/,
        /^choices/,
        /^glide-/,
        /data-.*/
      ]
    }),
    new ImageminPlugin({
      test: './src/**/*',
      cacheFolder: './cache/img',
      gifsicle: {
        optimizationLevel: 9
      },
      pngquant: {
        quality: '65-90'
      },
      plugins: [
        imageminMozjpeg({
          quality: '80'
        })
      ]
    })
  ]
})
