import Component from '../utils/component.js'
import { stateClass, dom } from '../utils/globals.js'

export default class Accordion extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const { element } = this.state
    element.addEventListener('click', function (e) {
      if (!element.classList.contains(stateClass.open)) {
        element.classList.add(stateClass.open)
      } else {
        element.classList.remove(stateClass.open)
      }
    })

    dom.window.addEventListener('click', e => {
      if (element !== undefined) {
        if (!element.contains(e.target)) {
          element.classList.remove(stateClass.open)
        }
      }
    })
  }
}
