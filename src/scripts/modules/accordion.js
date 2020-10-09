import Component from '../utils/component'
import { dom, stateClass } from '../utils/globals'

export default class Accordion extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    const { element } = this.state
    const data = {}

    if (Object.keys(this.state).includes('delta')) {
      data.delta = this.state.delta
    } else {
      data.delta = 20
    }
    this.setState({ data })

    // Add class
    element.classList.add('js-accordion')

    element.addEventListener('click', (e) => {
      e.preventDefault()
      if (!element.classList.contains(stateClass.open)) {
        this._removeClasses()
        element.classList.add(stateClass.open)
        this.scrollTo(element)
      } else {
        this._removeClasses()
      }
    })
  }

  scrollTo(target) {
    const { data } = this.state

    const offset =
      document.documentElement.scrollTop +
      target.getBoundingClientRect().top -
      data.delta
    requestAnimationFrame(() =>
      window.scrollTo({ top: offset, behavior: 'smooth' })
    )
  }

  _removeClasses() {
    const allInstances = dom.document.querySelectorAll('.js-accordion')

    Array.from(allInstances).forEach((instance) => {
      instance.classList.remove(stateClass.open)
    })
  }
}
