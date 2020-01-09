import Component from '../utils/component'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {
      data: 42
    }

    this.setState({ data })
  }

  destroy () {
    const { data = null } = this.state

    this.setState({
      data: data
    })
  }

  onResize () {}

  onScroll () {}
}
