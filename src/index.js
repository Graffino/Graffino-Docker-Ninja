import './styles/app.scss'

const requireAll = r => {
  r.keys().forEach(r)
}

requireAll(require.context('./modules/', true, /\.js$/))
requireAll(require.context('./images/', true, /\.(png|svg|jpe?g|gif)$/))
requireAll(require.context('./icons/', true, /\.svg$/))
