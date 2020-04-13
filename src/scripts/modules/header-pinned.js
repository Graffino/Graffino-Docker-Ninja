import Component from '../utils/component'
import { dom, stateClass } from '../utils/globals'

export default class HeaderPinned extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}

    data.lastKnownScrollY = 0
    data.currentScrollY = 0

    this.setState({
      data
    })
  }

  onScroll () {
    const { element, data } = this.state

    data.currentScrollY = dom.window.pageYOffset
    if (data.currentScrollY === 0) {
      element.classList.remove(stateClass.pinned)
    }
    if (data.currentScrollY > 50) {
      if (data.currentScrollY < data.lastKnownScrollY) {
        if (element.classList.contains(stateClass.unpinned)) {
          element.classList.remove(stateClass.unpinned)
          element.classList.add(stateClass.pinned)
        }
      } else if (data.currentScrollY > data.lastKnownScrollY) {
        if (
          element.classList.contains(stateClass.pinned) ||
          !element.classList.contains(stateClass.unpinned)
        ) {
          element.classList.remove(stateClass.pinned)
          element.classList.add(stateClass.unpinned)
        }
      }
      data.lastKnownScrollY = data.currentScrollY
    } else {
      element.classList.remove(stateClass.unpinned)
      element.classList.remove(stateClass.pinned)
    }
  }

  onResize () {}
}
