const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const common = require('./webpack.wordpress.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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
    })
  ]
})
