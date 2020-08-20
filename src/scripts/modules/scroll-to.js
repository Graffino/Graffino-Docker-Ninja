import Component from '../utils/component'
import { dom } from '../utils/globals'

export default class ScrollTo extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}
    const element = this.state.element

    if (element.getAttribute('href') === '#top') {
      data.target = 'html'
    } else {
      data.target = element.getAttribute('href')
    }

    // Save state
    this.setState({ data })

    element.addEventListener('click', (e) => {
      e.preventDefault()
      // Get offset
      data.offset = this.getElementOffset(data.target)

      // Save state
      this.setState({ data })

      // Scroll
      this.scrollTo()
    })
  }

  scrollTo () {
    const offset = this.state.data.offset
    requestAnimationFrame(() =>
      window.scrollTo({ top: offset, behavior: 'smooth' })
    )
  }

  getElementOffset (selector) {
    const element = dom.document.querySelector(selector)
    return element.getBoundingClientRect().top + window.scrollY
  }
}
