const path = require('path')
const glob = require('glob-all')
const { merge } = require('webpack-merge')
const common = require('./webpack.wordpress.js')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        test: /^(?!style).*\.css$/g,
        minify: async (data, inputMap) => {
          // eslint-disable-next-line global-require
          const CleanCSS = require('clean-css')
          const [[filename, input]] = Object.entries(data)
          const minifiedCss = await new CleanCSS({
            level: {
              2: {
                mergeSemantically: true
              }
            }
          }).minify({
            [filename]: {
              styles: input
            }
          })
          return {
            css: minifiedCss.styles,
            warnings: minifiedCss.warnings,
            errors: minifiedCss.errors
          }
        }
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true
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
      safelist: [
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
        /^glide/,
        /^glide-/,
        /data-.*/,
        /^page-template-/,
        /^single/,
        /^search/,
        /^-weight-*/,
        /^-size-*/,
        /^animate__*/,
        /^-profile-*/,
        /^-weight-*/
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
