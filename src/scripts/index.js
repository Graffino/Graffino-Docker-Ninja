import '../styles/app.scss'

// eslint-disable-next-line import/no-webpack-loader-syntax
import loadPolyfills from 'polyfill-io-loader!?Promise,NodeList.prototype.forEach,Object.assign,smoothscroll'
import requireAll from './utils/require-all'
import autoInitComponents from './utils/auto-init-components'

requireAll(require.context('../icons/', true, /\.svg$/))
requireAll(require.context('../images/', true, /\.(png|svg|jpe?g|gif)$/))

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.remove('no-js')

  loadPolyfills(() => {
    autoInitComponents()
  })
})
