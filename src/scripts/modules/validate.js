import Component from '../utils/component'
import Pristine from 'pristinejs'

export default class Validate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init() {
    const form = this.state.element

    const live = true

    const config = {
      classTo: 'form__field',
      errorClass: 'is-invalid',
      successClass: 'is-valid',
      errorTextParent: 'form__field',
      errorTextTag: 'div',
      errorTextClass: 'form__error'
    }

    const submitButton = form.querySelector('button[type="submit"]')

    const pristine = new Pristine(form, config, live)

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const valid = pristine.validate()

      if (valid) {
        form.submit()
      } else {
        submitButton.classList.add('animation-shake')
      }
    })

    submitButton.addEventListener('animationend', (e) => {
      e.preventDefault()
      submitButton.classList.remove('animation-shake')
    })
  }
}
