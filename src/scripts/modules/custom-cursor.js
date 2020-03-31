import Component from '../utils/component'

export default class CustomCursor extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    this.setState({
      clientX: -100,
      clientY: -100
    })

    this.initCursor()
  }

  initCursor () {
    document
      .querySelectorAll('canvas')[0]
      .addEventListener('mousemove', (e) => {
        this.state.clientX = e.clientX
        this.state.clientY = e.clientY
      })

    const render = () => {
      this.state.element.style.transform = `translate(${this.state.clientX}px, ${this.state.clientY}px)`

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }
}
