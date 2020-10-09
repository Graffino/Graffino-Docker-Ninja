import Component from '../utils/component.js'
import { stateClass } from '../utils/globals.js'

export default class SlideTop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init() {
    const { element } = this.state
    element.addEventListener('click', (e) => {
      e.preventDefault()
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
      )
    })
  }

  onScroll() {
    const { element } = this.state
    if (window.pageYOffset > 100) {
      element.classList.add(stateClass.active)
    } else {
      element.classList.remove(stateClass.active)
    }
  }
}
