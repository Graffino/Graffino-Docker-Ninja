import Component from '../utils/component'
import { dom } from '../utils/globals'

export default class Header extends Component {
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
    const classes = {
      pinned: 'is-pinned',
      unpinned: 'is-unpinned'
    }

    data.currentScrollY = dom.window.pageYOffset
    if (dom.window.innerWidth < 1050) {
      if (data.currentScrollY > element.offsetHeight) {
        if (data.currentScrollY < data.lastKnownScrollY) {
          if (element.classList.contains(classes.unpinned)) {
            element.classList.remove(classes.unpinned)
            element.classList.add(classes.pinned)
          }
        } else if (data.currentScrollY > data.lastKnownScrollY) {
          if (
            element.classList.contains(classes.pinned) ||
            !element.classList.contains(classes.unpinned)
          ) {
            element.classList.remove(classes.pinned)
            element.classList.add(classes.unpinned)
          }
        }
        data.lastKnownScrollY = data.currentScrollY
      }
    }
  }

  onResize () {
    if (dom.window.innerWidth > 1050) {
      const { element } = this.state
      const classes = {
        unpinned: 'is-unpinned'
      }
      element.classList.remove(classes.unpinned)
    }
  }
}
