import Component from '../utils/component'

export default class Module extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    this.state.element.addEventListener('input', (e) => {
      const x = e.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      e.target.value = !x[2]
        ? x[1]
        : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    })
  }
}
