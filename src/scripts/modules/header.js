import Component from '../utils/component'
import { stateClass, dom } from '../utils/globals'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
    console.log(this.state)
  }

  init () {
    this.state.element.style.position = 'fixed'
    this.state.lastScrollTop = 0
    this.state.delta = 200
    this.state.scrolled = 0
    this.state.headerHeight = this.state.element.offsetHeight
  }

  onScroll () {
    this.state.scrolled = document.documentElement.scrollTop || pageYOffset
    const windowHeight = dom.window.innerHeight
    const documentHeight = dom.document.body.clientHeight
    const $headerWrapper = this.state.element.querySelector(
      '.js-header-container'
    )
    const $navWrapper = this.state.element.querySelector('.js-nav')
    const $hamburgerWrapper = this.state.element.querySelector('.js-hamburger')

    if (this.state.scrolled > this.state.delta) {
      $headerWrapper.classList.add(stateClass.floating)
      $navWrapper.classList.add(stateClass.floating)
      $hamburgerWrapper.classList.add(stateClass.floating)

      if (
        this.state.scrolled > this.state.lastScrollTop &&
        this.state.scrolled > this.state.headerHeight
      ) {
        $headerWrapper.classList.remove(stateClass.visible)
        $headerWrapper.classList.add(stateClass.hidden)
      } else if (this.state.scrolled + windowHeight < documentHeight) {
        $headerWrapper.classList.remove(stateClass.hidden)
        $headerWrapper.classList.add(stateClass.visible)
      }
    } else if (this.state.scrolled <= this.state.delta) {
      $headerWrapper.classList.remove(stateClass.floating)
      $navWrapper.classList.remove(stateClass.floating)
      $hamburgerWrapper.classList.remove(stateClass.floating)
    }

    this.state.lastScrollTop = this.state.scrolled
  }
}
