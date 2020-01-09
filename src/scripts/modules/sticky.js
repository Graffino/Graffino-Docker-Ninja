import Component from '../utils/component'
import { breakpoints, dom, stateClass } from '../utils/globals'

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
    data.entrance = null
    data.noBottomLimit = false
    const feedbackBox = document.getElementsByClassName('js-feedback-box')[0]
    this.setState({ ...this.state, feedbackBox })

    if (Object.keys(this.state).includes('entrance')) {
      data.entrance = this.state.entrance
    }
    if (Object.keys(this.state).includes('stickyNoBottomLimit')) {
      data.noBottomLimit = true
    }

    if (Object.keys(this.state).includes('stickyBottomLimitFooter')) {
      const footerHeight = document.querySelector('.footer').offsetHeight
      data.botLimit = dom.document.body.offsetHeight - data.viewportHeight - footerHeight
    }

    if (Object.keys(this.state).includes('stickyParent')) {
      data.parent = this.state.element.parentElement
    } else {
      data.parent = dom.document.body
    }
    data.delta = 20
    data.newTop = 0
    data.disableBreakpoint = breakpoints.medium
    data.offset = this.state.element.parentElement.getBoundingClientRect().top
    data.topLimit =
      this.state.element.getBoundingClientRect().top +
      dom.document.documentElement.scrollTop

    if (typeof data.botLimit === 'undefined') {
      data.botLimit = data.parent.getBoundingClientRect().top + dom.document.documentElement.scrollTop + data.parent.offsetHeight
    }
    this.setState({ data })
  }

  onScroll () {
    const { element, data } = this.state

    element.classList.add(stateClass.sticky)
    element.classList.remove(stateClass.floating)
    data.parent.classList.add(stateClass.stickyParent)

    const scrollPos = document.documentElement.scrollTop
    // If scroll position hasn't reached the top limit
    if (scrollPos < data.topLimit) {
      data.newTop = 0
      element.classList.remove(stateClass.floating)
      // If scroll position is between the top and bottom limits
    } else if (scrollPos >= data.topLimit && scrollPos <= data.botLimit) {
      data.newTop = scrollPos - data.topLimit + 12
      if (data.newTop > data.delta) {
        element.classList.add(stateClass.floating)
      } else {
        element.classList.remove(stateClass.floating)
      }

    // If scroll position is below the bottom limit
    } else if (scrollPos > data.botLimit) {
      data.newTop = data.parent.offsetHeight - element.offsetHeight
      // If anything else fails :-)
    } else {
      data.newTop = 0
    }

    // Request animation frame to prevent stutters in between the draws
    dom.window.requestAnimationFrame(() => {
      if (data.entrance === null) {
        Object.assign(element.style, {
          transform: `translate3d(0, ${Math.floor(data.newTop)}px, 0)`
        })
      } else if (data.entrance === 'bottom') {
        let bottomPos = 0

        if (scrollPos >= data.botLimit) {
          Object.assign(element.style, {
            opacity: '0',
            visibility: 'hidden',
            'transition-property': 'none'
          })
        } else if (scrollPos - element.offsetHeight <= data.topLimit) {
          bottomPos = 0
          element.classList.remove('animation-slide-in-top')
        } else {
          const feedbackBoxHeight = this.state.feedbackBox ? this.state.feedbackBox.offsetHeight : 0
          bottomPos = `calc(100vh + ${Math.floor((data.newTop - element.offsetHeight - feedbackBoxHeight - 12))}px)`
          Object.assign(element.style, {
            opacity: '1',
            visibility: 'visible',
            'transition-property': 'none'
          })
          if (this.state.feedbackBox && document.querySelector('.form__container').classList.contains('disclaimer-shown') && !element.classList.contains(stateClass.floating)) {
            this.state.feedbackBox.classList.remove(stateClass.visible)
          }
          element.classList.add('animation-slide-in-top')
        }
        Object.assign(element.style, {
          transform: `translate3d(0, ${bottomPos}, 0)`
        })
      }
    })
  }
}
