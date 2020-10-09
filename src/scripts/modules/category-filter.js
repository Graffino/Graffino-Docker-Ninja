import Component from '../utils/component'
import { dom, stateClass } from '../utils/globals'

export default class CategoryFilter extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    this.setState({
      currentFilter: 'all'
    })

    const filterButtons = this.state.element.querySelectorAll('[data-filter]')

    Array.from(filterButtons).forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((button) => {
          button.classList.remove(stateClass.active)
        })
        this.state.currentFilter = button.dataset.filter
        button.classList.add(stateClass.active)
        this.filterQuestions()
      })
    })
  }

  filterQuestions() {
    const $accordionWrapper = dom.document.querySelector(
      '.js-accordion-wrapper'
    )

    $accordionWrapper.dataset.show = this.state.currentFilter
  }
}
