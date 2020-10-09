import Component from '../utils/component'

export default class MasonryLayout extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    setTimeout(() => {
      this.setState({
        instance: new window.Masonry('.masonry', this.state.masonrySettings)
      })
    }, 0)
  }
}
