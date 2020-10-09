import Component from '../utils/component'
import { stateClass } from '../utils/globals'
const mobile = require('is-mobile')

export default class MobileDetect extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    const options = {
      tablet: true,
      features: true
    }

    const isMobile = mobile(options)

    if (isMobile) {
      this.state.element.classList.add(stateClass.mobile)
    } else {
      this.state.element.classList.add(stateClass.desktop)
    }
  }
}
