import Component from '../utils/component'
import anime from 'animejs/lib/anime.es.js'

const animations = {
  blink: anime({
    targets: '#blink #blinker',
    fill: ['#9B1414', '#FFF'],
    easing: 'easeInOutQuad',
    duration: 1000,
    loop: true,
    autoplay: false
  })
}
export default class Animation extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    this.state.element.animationHandler = this
  }

  play (element) {
    const animation = animations[element.dataset.stepAnimation]
    animation.play()
  }

  pause (element) {
    const animation = animations[element.dataset.stepAnimation]
    animation.pause()
  }

  seek (element, progress) {
    const animation = animations[element.dataset.stepAnimation]
    animation.seek(progress * animation.duration)
  }

  playStep (element, step) {
    const animation = animations[`${element.dataset.stepAnimation}_${step}`]
    animation.play()
  }
}
