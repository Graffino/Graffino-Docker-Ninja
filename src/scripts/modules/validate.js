import Component from '../utils/component'
import Pristine from 'pristinejs'
import { dom } from '../utils/globals'

export default class Validate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const config = {
      classTo: 'js-validate-field',
      errorClass: 'is-invalid',
      successClass: 'is-valid',
      errorTextParent: 'js-validate-field',
      errorTextClass: 'h-display-none',
      errorTextTag: 'div'
    }
    const $form = this.state.element

    $form.pristineInstance = new Pristine(this.state.element, config, true)
    $form.Pristine = Pristine
    $form.pristineConfig = config

    const $lockAction = dom.document.querySelector('.js-lock-action')
    $form.classList.add('js-validate')

    $lockAction.addEventListener('click', (e) => {
      const $container = dom.document.querySelector('.js-lock-container')
      const $locks = dom.document.querySelectorAll('.js-lock')
      const $elements = dom.document.querySelectorAll('.js-lock-validate')
      const $turnOvers = dom.document.querySelectorAll('.js-turnover-validate')
      const valid = $form.pristineInstance.validate()

      if ($lockAction.getAttribute('type') !== 'submit') {
        e.preventDefault()
      }

      if (valid) {
        Array.from($turnOvers).forEach(($turnOver) =>
          $turnOver.classList.remove('is-valid')
        )
        $elements.forEach(($element) => {
          $element.setAttribute('required', 'required')
        })

        $locks.forEach(($lock) => {
          $lock.classList.add('is-active')
        })

        $container.classList.add('is-active')
        $lockAction.setAttribute('type', 'submit')
        $lockAction.setAttribute('tabindex', '10')
        $lockAction.innerHTML = 'Email me the full report'
      } else {
        $elements.forEach(($element) => {
          $element.removeAttribute('required')
        })

        $locks.forEach(($lock) => {
          $lock.classList.remove('is-active')
        })
      }
    })

    $form.addEventListener('submit', (e) => {
      const valid = $form.pristineInstance.validate()

      if (!valid) {
        e.preventDefault()
      }
    })
  }
}
