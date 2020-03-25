import Component from '../utils/component'
import { dom, stateClass } from '../utils/globals'

export default class InputSwitch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const element = this.state.element
    const $initialSalary = dom.document.querySelector('.js-hero-value')
    const $salaryInput = dom.document.querySelector('.js-hero-input')
    const $editInput = dom.document.querySelector('.js-hero-edit')

    element.addEventListener('click', () => {
      $initialSalary.classList.add(stateClass.hidden)
      $salaryInput.classList.add(stateClass.visible)
      $editInput.textContent = 'Save'
    })
  }
}
