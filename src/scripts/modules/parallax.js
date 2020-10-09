import Component from '../utils/component'
import Rellax from 'rellax'

export default class Parallax extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init() {
    // eslint-disable-next-line no-unused-vars
    const rellax = new Rellax(this.state.element, {
      speed: this.state.speed || -2,
      center: this.state.center || true,
      wrapper: this.state.wrapper || null,
      round: this.state.round || true,
      vertical: this.state.vertical || true,
      horizontal: this.state.horizontal || false
    })
  }
}
