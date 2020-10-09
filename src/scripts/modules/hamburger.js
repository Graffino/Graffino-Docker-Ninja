import Component from '../utils/component.js'
import { dom, stateClass, breakpoints } from '../utils/globals.js'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default class Hamburger extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    // Targets elements and sets them for all script.
    this.setState({
      $trigger: this.state,
      $header: dom.document.querySelector('.js-header'),
      $hamburger: dom.document.querySelector('.js-hamburger'),
      $menu: dom.document.querySelector('.js-menu'),
      $openItems: dom.document.querySelectorAll('.js-menu-action'),
      $dropdownsAll: dom.document.querySelectorAll('.js-menu-dropdown'),
      $unscroll: dom.document.body,
      $touchedAll: dom.document.querySelectorAll(`.${stateClass.touched}`),
      $caption: dom.document.querySelector('.js-hamburger-caption')
    })

    const component = this.state

    // Global listener
    document.body.addEventListener(
      'click',
      (e) => {
        const $item = e.target

        // Listen for tap
        if ($item.classList.contains('js-double-tap')) {
          // Prevent first tap
          this.doubleTap(e)
        }

        // Listen for menu class
        if (
          this.isMobile() &&
          $item.className === component.element.className
        ) {
          e.preventDefault()

          if (component.$menu.classList.contains(stateClass.active)) {
            this.close()
          } else {
            this.open()
          }
        }

        if ($item.parentElement.classList.contains('js-disable-click')) {
          e.preventDefault()
          e.stopPropagation()
        }

        // Listen for submenu class
        if (this.isMobile() && $item.classList.contains('js-menu-action')) {
          // If on mobile activate expand / collapse
          if ($item.classList.contains(stateClass.active)) {
            this.collapse($item)
          } else {
            this.expand($item)
          }
        }
      },
      false
    )
  }

  onResize() {
    if (!this.isMobile()) {
      this.close()
    }
  }

  // Check if device supports touch
  isTouch() {
    return matchMedia('(hover: none)').matches === true
  }

  // Check for mobile breakpoint
  isMobile() {
    const check = dom.window.innerWidth <= breakpoints.xlarge
    return check === true
  }

  // Prevent link on first tap
  doubleTap(e) {
    const $item = e.target
    const component = this.state

    // Prevent first click if on touch devices
    if (this.isTouch()) {
      if ($item.classList.contains(stateClass.touched)) {
        $item.classList.remove(stateClass.touched)
      } else {
        e.preventDefault()
        // Check for other touches
        this.setState({
          $touchedAll: dom.document.querySelectorAll(`.${stateClass.touched}`)
        })

        // Remove all other touched elements
        if (
          component.$touchedAll !== null &&
          component.$touchedAll !== 'undefined'
        ) {
          const $touchedAll = Array.from(component.$touchedAll)
          for (const $touched of $touchedAll) {
            $touched.classList.remove(stateClass.touched)
          }
        }

        // Add current element as touched
        $item.classList.add(stateClass.touched)
      }
    }
  }

  expand($item) {
    this.collapseAll()
    $item.nextElementSibling.classList.add(stateClass.open)
    $item.classList.add(stateClass.active)
  }

  collapse($item) {
    $item.nextElementSibling.classList.remove(stateClass.open)
    $item.classList.remove(stateClass.active)
  }

  collapseAll() {
    const component = this.state
    const $dropdownsAll = Array.from(component.$dropdownsAll)
    const $openItems = Array.from(component.$openItems)

    for (const $dropdown of $dropdownsAll) {
      $dropdown.classList.remove(stateClass.open)
    }

    for (const $openItem of $openItems) {
      $openItem.classList.remove(stateClass.active)
    }
  }

  open() {
    const component = this.state
    component.$hamburger.classList.add(stateClass.open)
    component.$menu.classList.add(stateClass.active)
    component.$header.classList.add(stateClass.active)
    component.$header.classList.add(stateClass.open)
    component.$unscroll.classList.add(stateClass.overflow)
    component.$caption.innerText = this.state.closeMenuLabel
    disableBodyScroll(this.state.$menu)
    this.setState({
      $menu: dom.document.querySelector('.js-menu')
    })
  }

  close() {
    const component = this.state
    this.collapseAll()
    component.$hamburger.classList.remove(stateClass.open)
    component.$menu.classList.remove(stateClass.active)
    component.$header.classList.remove(stateClass.open)
    component.$header.classList.remove(stateClass.active)
    component.$unscroll.classList.remove(stateClass.overflow)
    component.$caption.innerText = this.state.menuLabel
    enableBodyScroll(this.state.$menu)
  }
}
