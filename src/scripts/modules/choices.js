import Component from '../utils/component'
import Choices from 'choices.js'

export default class Module extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    this.state.element.choicesHandler = this

    const options = {
      searchEnabled: false,
      itemSelectText: ''
    }

    const choices = new Choices(this.state.element, options)

    if (this.state.element.dataset.initialValue) {
      choices.setChoiceByValue(this.state.element.dataset.initialValue)
    }

    this.setState({ choices })
  }
}
