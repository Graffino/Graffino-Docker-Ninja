import Component from '../utils/component'
import { dom, stateClass } from '../utils/globals'

export default class Expand extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}

    if (Object.keys(this.state).includes('expandOpen')) {
      data.expand = dom.document.querySelector(`.${this.state.expandOpen}`)
    }

    if (Object.keys(this.state).includes('expandCollapse')) {
      data.collapse = dom.document.querySelector(
        `.${this.state.expandCollapse}`
      )
    }

    data.height = this.state.element.getBoundingClientRect().top

    // Add State classes
    this.state.element.classList.add('js-expand')
    this.setState({ data })

    data.expand.addEventListener('click', () => {
      const { element, data } = this.state
      data.height = this.state.element.getBoundingClientRect().top
      this.setState({ data })
      element.classList.add(stateClass.expanded)
      element.classList.add(stateClass.disabled)
      data.expand.classList.add(stateClass.hidden)
      data.collapse.classList.remove(stateClass.hidden)
      this.scrollTo('expand')
    })

    data.collapse.addEventListener('click', () => {
      const { element, data } = this.state
      data.height = this.state.element.getBoundingClientRect().top
      this.setState({ data })
      element.classList.remove(stateClass.expanded)
      element.classList.remove(stateClass.disabled)
      data.expand.classList.remove(stateClass.hidden)
      data.collapse.classList.add(stateClass.hidden)
      this.scrollTo('collapse')
    })

    // Save state
  }

  scrollTo (type) {
    const data = this.state.data
    const scrollTop = dom.document.documentElement.scrollTop
    let scrollTo = 0

    if (type === 'expand') {
      scrollTo = scrollTop + data.height
    } else {
      scrollTo = scrollTop + data.height
    }

    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollTo, behavior: 'smooth' })
    )
  }

  // Close expand on resize
  onResize () {
    const { element, data } = this.state

    element.classList.remove(stateClass.expanded)
    element.classList.remove(stateClass.disabled)
    data.expand.classList.remove(stateClass.hidden)
    data.collapse.classList.add(stateClass.hidden)

    this.scrollTo('collapse')
  }
}
