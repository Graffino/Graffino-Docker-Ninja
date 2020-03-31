import Component from '../utils/component'

export default class MaskReveal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    this.state.element.parentNode
      .querySelector('.js-reveal-mask')
      .click(function (e) {
        e.preventDefault()
        this.toggleClass('is-revealed')

        const $el = this.parentNode.querySelector('input')

        if ($el.attr('type') === 'password') {
          $el.attr('type', 'text')
        } else {
          $el.attr('type', 'password')
        }
      })
  }
}
