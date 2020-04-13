import Component from '../utils/component'
import Glide from '@glidejs/glide'

export default class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}
    const element = this.state.element
    data.slides = 3

    window.dataset = element.dataset
    if (Object.keys(element.dataset).includes('slides')) {
      data.slides = parseInt(element.dataset.slides, 10)
    }

    // eslint-disable-next-line no-unused-vars
    const sliderInstance = new Glide(element, {
      type: 'carousel',
      startAt: 0,
      perView: data.slides
    }).mount()
  }
}
