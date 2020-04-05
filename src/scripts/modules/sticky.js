import Component from '../utils/component'
import stickybits from 'stickybits'
import { dom, breakpoints, stateClass } from '../utils/globals'

export default class Sticky extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const $header = dom.document.querySelector('.js-header')

    this.setState({
      $header
    })
  }

  onScroll () {
    const { $header } = this.state

    if (dom.window.innerWidth > breakpoints.large) {
      if ($header.classList.contains(stateClass.pinned) === true) {
        stickybits('.js-sticky-element', {
          stickyBitStickyOffset: 115
        })
      } else if ($header.classList.contains(stateClass.unpinned) === true) {
        stickybits('.js-sticky-element', {
          stickyBitStickyOffset: 10
        })
      }
    }
  }

  onResize () {
    stickybits('.js-sticky-element').cleanup()
  }
}
