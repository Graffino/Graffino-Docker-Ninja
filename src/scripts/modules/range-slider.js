import Component from '../utils/component'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

export default class RangeSlider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const slider = this.state.element

    noUiSlider.create(slider, {
      start: 50,
      connect: 'lower',
      tooltips: wNumb({ decimals: 0 }),
      range: {
        min: [0],
        max: [100]
      }
    })
  }
}
