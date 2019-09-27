const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const common = require('./webpack.wordpress.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
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
        path.join(__dirname, './wordpress/**/*.php')
      ),
      extractors: [{
        extractor: class {
          static extract (content) {
            return content.match(/[A-z0-9-:/]+/g) || []
          }
        },
        extensions: ['handlebars', 'html', 'js', 'php', 'vue'],
        whitelistPatterns: [/^is-/, /^has-/, /^animation-/, /^debug/]
      }]
    }),
    new CompressionPlugin({
      test: /\.(html|css|js)(\?.*)?$/i
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      cacheFolder: './cache/img',
      gifsicle: {
        optimizationLevel: 9
      },
      pngquant: ({
        quality: '65-90'
      }),
      plugins: [imageminMozjpeg({
        quality: '75'
      })]
    })
  ]
})
