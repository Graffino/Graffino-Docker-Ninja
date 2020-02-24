'use strict'
import { dom } from './globals.js'

class Component {
  constructor (props) {
    if (!props.element) {
      console.log(
        'Component: You did not provide an element to make into a component.'
      )
    }

    this.state = {
      element: props.element
    }

    this.init = this.init.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onScroll = this.onScroll.bind(this)

    this.init()
    dom.window.addEventListener('scroll', () => this.onScroll())
    dom.window.addEventListener('resize', () => this.onResize())
  }

  setState (props) {
    // eslint-disable-next-line no-unused-vars
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        this.state[key] = props[key]
      }
    }
  }

  init () {
    console.log('Components Init')
  }

  destroy () {}

  onResize () {}

  onScroll () {}
}

export default Component
