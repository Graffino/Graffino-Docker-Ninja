import Component from '../utils/component'
const FontFaceObserver = require('fontfaceobserver')

export default class AvoidFOIT extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const fonts = ['Montserrat', 'Inconsolata']

    fonts.forEach((font) => {
      const observer = new FontFaceObserver(font)

      observer.load().then(
        () => {
          this.state.element.classList.remove('no-fonts')
        },
        () => {
          this.state.element.classList.add('no-fonts')
        }
      )
    })
  }
}
