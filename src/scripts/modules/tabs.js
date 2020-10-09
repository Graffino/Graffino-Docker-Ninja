import Component from '../utils/component'
import { dom, stateClass } from '../utils/globals'

export default class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init() {
    const $tabs = dom.document.querySelectorAll('.js-tab')
    const $contents = dom.document.querySelectorAll('.js-content')

    $tabs.forEach((selectedTab) => {
      selectedTab.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        $tabs.forEach((tab) => {
          if (tab.classList.contains('is-active')) {
            tab.classList.remove(stateClass.active)
          }
        })
        target.classList.add(stateClass.active)
        $contents.forEach((content) => {
          if (content.dataset.propTabTitle === target.innerHTML) {
            content.classList.add(stateClass.active)
          } else if (content.classList.contains('is-active')) {
            content.classList.remove(stateClass.active)
          }
        })
      })
    })
  }
}
