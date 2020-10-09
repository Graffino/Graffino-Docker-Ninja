import Component from '../utils/component'
import Plyr from 'plyr'

export default class Video extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    // eslint-disable-next-line
    const player = new Plyr('#player')
  }
}
