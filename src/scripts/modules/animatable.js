import Component from '../utils/component'

export default class Animatable extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    // eslint-disable-next-line new-cap
    this.state.element.commitAnimation = this.animate
    this.state.element.commitCleaning = this.clean
    this.state.element.animationName = this.state.animationName
    this.state.element.reversedAnimationName = this.state.reversedAnimationName
    this.state.element.exitAnimationName = this.state.exitAnimationName
    this.state.element.animationStep = this.state.animationStep

    if (this.state.animationOnLoad === 'true') {
      this.state.element.classList.add(...this.state.animationName.split(' '))
    }
  }

  animate (className) {
    requestAnimationFrame(() => {
      this.classList.add(...className.split(' '))
    })
  }

  animateExit (className, exitClassName) {
    requestAnimationFrame(() => {
      this.classList.remove(...className.split(' '))
      this.classList.add(...exitClassName.split(' '))
    })
  }

  clean (className) {
    requestAnimationFrame(() => {
      this.classList.remove(...className.split(' '))
    })
  }
}
