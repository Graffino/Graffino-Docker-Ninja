import '../styles/app.scss'
import '@babel/polyfill'
// eslint-disable-next-line import/no-webpack-loader-syntax
import loadPolyfills from 'polyfill-io-loader!?Promise,NodeList.prototype.forEach,Object.assign'
import requireAll from './utils/require-all'
import autoInitComponents from './utils/auto-init-components'

requireAll(require.context('../images/', true, /\.(png|svg|jpe?g|gif)$/))
requireAll(require.context('../icons/', true, /\.svg$/))

document.addEventListener('DOMContentLoaded', () => {
  loadPolyfills(() => {
    autoInitComponents()
  })
})
