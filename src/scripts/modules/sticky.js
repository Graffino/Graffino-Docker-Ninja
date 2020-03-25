import Component from '../utils/component'
import { dom, breakpoints, stateClass } from '../utils/globals'

export default class Sticky extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}
    data.viewportHeight = Math.max(
      dom.document.documentElement.clientHeight,
      dom.window.innerHeight || 0
    )

    // Add State classes
    this.state.element.classList.add('js-sticky')

    // Get props
    if (Object.keys(this.state).includes('stickyDisableOn')) {
      data.disableOn = this.state.stickyDisableOn
    }

    if (Object.keys(this.state).includes('stickyEntrance')) {
      data.entrance = this.state.stickyEntrance
      data.entranceDefault = this.state.stickyEntrance
    } else {
      data.entrance = 'top'
      data.entranceDefault = 'top'
    }

    if (Object.keys(this.state).includes('stickyEntranceBreakpoint')) {
      data.entranceBreakpoint = this.state.stickyEntranceBreakpoint
    }

    if (Object.keys(this.state).includes('stickyEntranceMobile')) {
      data.entranceMobile = this.state.stickyEntranceMobile
    }

    if (Object.keys(this.state).includes('stickyBottomLimit')) {
      data.$bottomLimit = dom.document.querySelector(`.${this.state.stickyBottomLimit}`)
    }

    if (Object.keys(this.state).includes('stickyParent')) {
      data.$parent = dom.document.querySelector(`.${this.state.stickyParent}`)
      data.parent = this.state.stickyParent
    } else {
      data.$parent = dom.document.body
    }

    if (Object.keys(this.state).includes('stickyPushTop')) {
      data.$pushTop = dom.document.querySelector(`.${this.state.stickyPushTop}`)
    }

    if (Object.keys(this.state).includes('stickyDelta')) {
      data.delta = parseInt(this.state.stickyDelta)
    }

    if (Object.keys(this.state).includes('stickyDeltaTop')) {
      data.deltaTop = parseInt(this.state.stickyDeltaTop)
    }

    if (Object.keys(this.state).includes('stickyDeltaBottom')) {
      data.deltaBottom = parseInt(this.state.stickyDeltaBottom)
    }

    // Initialize empty top
    data.newTop = 0

    // Calculate parent offset
    data.offset = data.$parent.getBoundingClientRect().top

    // Calculate top limit
    data.topLimit = this.state.element.getBoundingClientRect().top + dom.document.documentElement.scrollTop

    // Calculate bottom limit from parent div if prop not present
    if (typeof data.$bottomLimit === 'undefined') {
      data.bottomLimit = data.$parent.getBoundingClientRect().top + dom.document.documentElement.scrollTop + data.$parent.offsetHeight
    } else {
      // Calculate bottom limit
      data.bottomLimit = dom.document.body.offsetHeight - data.viewportHeight - data.$bottomLimit.offsetHeight
    }

    // Save state
    this.setState({ data })
  }

  onResize () {
    // Reinit
  }

  onScroll () {
    const { element, data } = this.state

    // Get current scroll position
    const scrollPos = dom.document.documentElement.scrollTop

    // Reset data entrance if entranceBreakpoint prop is defined and breakpoint is hit
    if (typeof data.entranceBreakpoint !== 'undefined') {
      if (dom.window.innerWidth <= breakpoints[data.entranceBreakpoint]) {
        data.entrance = data.entranceMobile
      } else {
        data.entrance = data.entranceDefault
      }
    }

    // If sticky enters from top we need to account for the menu if prop is set
    if (typeof data.$pushTop !== 'undefined') {
      // If menu is visible add it's height
      if (data.$pushTop.classList.contains(stateClass.pinned)) {
        data.pushTop = data.$pushTop.offsetHeight
      } else {
        data.pushTop = 0
      }
    } else {
      data.pushTop = 0
    }

    // If entrance is from the top
    if (data.entrance === 'top') {
      // If scroll position hasn't reached the top limit
      if (scrollPos >= data.topLimit && scrollPos <= data.bottomLimit) {
        data.newTop = scrollPos - data.topLimit + 12 + data.pushTop

      // If scroll position is below the bottom limit
      } else if (scrollPos > data.bottomLimit) {
        data.newTop = data.$parent.offsetHeight - element.offsetHeight
      } else {
        data.newTop = 0
      }
      // If entrance is from the bottom
    } else if (data.entrance === 'bottom') {
      const dataParentOffset = data.$parent.offsetHeight

      // If scroll position is above bot limit
      if (scrollPos < data.topLimit) {
        data.newTop = data.topLimit + element.offsetHeight + data.pushTop + data.delta
      } else if (scrollPos > data.topLimit && scrollPos < data.bottomLimit) {
        data.newTop = scrollPos - data.topLimit + data.viewportHeight - element.offsetHeight - data.delta
      } else if (scrollPos > data.bottomLimit) {
        data.newTop = dataParentOffset + data.deltaBottom
      }
    } else {
      // If everything else fails :-)
      data.newTop = 0
    }

    // If when passing delta add/remove floating class
    if (
      scrollPos > (data.topLimit + data.deltaTop) &&
      scrollPos < (data.bottomLimit + data.deltaBottom)
    ) {
      element.classList.remove(stateClass.floating)
      element.classList.add(stateClass.sticky)
    } else {
      element.classList.add(stateClass.floating)
      element.classList.remove(stateClass.sticky)
    }

    // If disabledOn prop class is present lock sticky in place
    const isDisabled = element.classList.contains(data.disableOn)
    if (isDisabled) {
      data.newTop = dom.document.scrollTop
    }
    // eslint-disable-next-line
    dom.window.requestAnimationFrame(() => {
      // E pur si muove
      Object.assign(element.style, {
        opacity: '1',
        visibility: 'visible',
        transform: `translate3d(0, ${Math.floor(data.newTop)}px, 0)`
      })
    })
  }
}
