import './styles/app.scss'

const requireAll = r => {
  r.keys().forEach(r)
}

requireAll(require.context('./modules/', true, /\.js$/))
