import Component from '../utils/component'
import Glide from '@glidejs/glide'

export default class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const element = this.state.element

    // eslint-disable-next-line no-unused-vars
    const glide = new Glide(element, {
      type: 'carousel',
      autoplay: 0,
      animationDuration: 600,
      animationTimingFunc: 'linear',
      perView: 3,
      slideToScroll: 1,
      slideToShow: 3,
      startAt: 0,
      gap: 24,
      perTouch: 1
    }).mount()
  }
}
