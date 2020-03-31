import Component from '../utils/component'
import { dom } from '../utils/globals'

export default class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    this.handler()
  }

  handler () {
    this.setState({
      triggers: dom.document.querySelectorAll('.js-dropdown-trigger')
    })

    const { triggers } = this.state
    for (const element of triggers) {
      element.addEventListener('click', (e) => {
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
    if (this.state.element.style.maxHeight) {
      this.state.element.style.maxHeight = null
    } else {
      this.state.element.style.maxHeight = `${this.state.element.scrollHeight}px`
    }
  }
}
