import '../styles/app.scss'
import '@babel/polyfill'

import requireAll from './utils/require-all'
import autoInitComponents from './utils/auto-init-components'

requireAll(require.context('../images/', true, /\.(png|svg|jpe?g|gif)$/))
requireAll(require.context('../icons/', true, /\.svg$/))

autoInitComponents()
