import Component from '../utils/component.js'
import { isTouchDevice } from '../utils/helpers'
import jump from 'jump.js'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    this.changeIcon()

    this.state.element.addEventListener('click', (e) => {
      e.preventDefault()
      jump(`#${this.state.target}`)
    })
  }

  changeIcon () {
    const icons = this.state.element.querySelectorAll('.js-slide-icon')
    const type = isTouchDevice() ? 'touch' : 'mouse'

    if (icons) {
      Array.from(icons).map((icon) => {
        if (icon.dataset.type === type) {
          icon.classList.remove('h-visually-hidden')
        }
      })
    }
  }
}
