import Component from '../utils/component.js'
import jump from 'jump.js'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    this.state.element.addEventListener('click', () => {
      jump('#target')
    })
  }
}
