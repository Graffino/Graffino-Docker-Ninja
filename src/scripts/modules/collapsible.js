import Component from '../utils/component'
import { dom, breakpoints, stateClass } from '../utils/globals'

export default class Collapsible extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    if (dom.window.innerWidth <= breakpoints.xxlarge) {
      this.handler()
    }
  }

  handler () {
    this.setState({
      triggers: dom.document.querySelectorAll('.js-collapsible-trigger')
    })

    const { triggers } = this.state
    for (const element of triggers) {
      element.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()
        this.setState({
          current: element
        })
        this.open()
      })
    }
  }

  open () {
    if (dom.window.innerWidth <= breakpoints.xxlarge) {
      const { current } = this.state
      current.querySelector('.js-hamburger').classList.toggle(stateClass.active)

      if (this.state.element.style.maxHeight) {
        this.state.element.style.maxHeight = null
      } else {
        this.state.element.style.maxHeight = `${this.state.element.scrollHeight}px`
      }
    }
  }
}
