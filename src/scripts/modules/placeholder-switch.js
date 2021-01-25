import Component from '../utils/component'

export default class PlaceholderSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    this.state.element.addEventListener('click', (_e) => {
      Array.from(
        document.querySelectorAll(
          `[data-placeholder-switch-id="${this.state.element.dataset.placeholderSwitchTarget}"]`
        )
      ).map((el) => {
        el.setAttribute('placeholder', this.state.element.dataset.placeholder)
      })
    })
  }
}
