const path = require('path')
const glob = require('glob-all')
const { merge } = require('webpack-merge')
const common = require('./webpack.wordpress.js')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
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
        parallel: true,
        exclude: /\/uploads/,
        minimizerOptions: [
          {
            level: {
              2: {
                mergeSemantically: true
              }
            }
          },
          {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        ],
        minify: [
          CssMinimizerPlugin.cleanCssMinify,
          CssMinimizerPlugin.cssnanoMinify
        ]
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        exclude: /\/uploads/
      })
    ]
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(
        [
          path.join(__dirname, './src/**/*.js'),
          path.join(__dirname, './src/**/*.vue'),
          path.join(__dirname, './wordpress/**/*.php')
        ],
        { nodir: true }
      ),
      extractors: [
        {
          extractor: (content) => content.match(/[A-z0-9-:/]+/g) || [],
          extensions: ['js', 'php', 'vue']
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
        /^wp-/,
        /^hs-/,
        /^hs_/,
        /^grecaptcha-/,
        /^submitted-/,
        /^legal-/,
        /^plyr.*/,
        /^sprite.*/,
        /^icon.*/,
        /^label.*/,
        /iframe/,
        /^hbspt-/,
        /^cta_/,
        /^-weight-*/,
        /ol/,
        /h4/,
        /^inputs-list*/
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
