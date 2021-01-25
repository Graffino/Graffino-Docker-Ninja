import Component from '../utils/component'
import { CountUp } from 'countup.js'
import 'intersection-observer'

export default class Countup extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    this.state.element.countUpHandler = this

    this.state.instance = new CountUp(
      this.state.element,
      this.state.targetNumber
    )

    const observer = new IntersectionObserver((entries, _observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.start()
        } else {
          this.reset()
        }
      })
    })

    observer.observe(this.state.element)
  }

  start() {
    this.state.instance.start()
  }

  reset() {
    this.state.instance.reset()
  }
}
