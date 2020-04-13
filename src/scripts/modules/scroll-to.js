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
      data.offset = dom.document
        .querySelector(data.target)
        .getBoundingClientRect().offset

      // Save state
      this.setState({ data })

      // Scroll
      this.scrollTo()
    })
  }

  scrollTo () {
    const offset = this.state.data
    requestAnimationFrame(() =>
      window.scrollTo({ top: offset, behavior: 'smooth' })
    )
  }
}
