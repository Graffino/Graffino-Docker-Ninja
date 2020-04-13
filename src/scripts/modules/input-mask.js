import Component from '../utils/component'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    this.state.element.addEventListener('input', (event) => {
      const value = event.target.value
        .replace(/[^\d]/g, '')
        .match(/^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)?$/gm)

      event.target.value = value
    })
  }
}
