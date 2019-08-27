import Component from '../utils/component.js'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const INITIAL_STATE = {
      data: 42
    }

    this.setState({ INITIAL_STATE })
  }

  destroy () {
    const {
      data = null
    } = this.state

    this.setState({
      data: data
    })
  }

  onResize () {}

  onScroll () {}
}
