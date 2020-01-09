import Component from '../utils/component'
import { stateClass, dom } from '../utils/globals'

export default class Accordion extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const { element } = this.state
    element.addEventListener('click', e => {
      if (!Array.from(element.classList).includes(stateClass.open)) {
        element.classList.add(stateClass.open)
      } else {
        element.classList.remove(stateClass.open)
      }
    })

    dom.window.addEventListener('click', e => {
      const check = dom.document.getElementsByClassName('js-sidebar-menu')

      if (check.length > 0) {
        if (
          !dom.document.getElementsByClassName('js-sidebar-menu')[0].contains(e.target)
        ) {
          element.classList.remove(stateClass.open)
        }
      }
    })
  }
}
