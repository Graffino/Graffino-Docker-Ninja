import Component from '../utils/component'
import { dom } from '../utils/globals'
import axios from 'axios'
import Pristine from 'pristinejs'

export default class AjaxForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    const live = true

    const config = {
      classTo: 'form__field',
      errorClass: 'is-invalid',
      successClass: 'is-valid',
      errorTextParent: 'form__field',
      errorTextTag: 'div',
      errorTextClass: 'form__error'
    }

    const data = {}
    const $form = this.state.element

    this.addAjaxFlag(this.state.element)
    data.ajaxUrl = window.location.origin + '/wp-admin/admin-ajax.php'

    if (Object.keys(this.state).includes('ajaxFormHandler')) {
      data.callback = this[this.state.ajaxFormHandler]
    } else {
      data.callback = this.callback
    }

    if (Object.keys(this.state).includes('ajaxFormScroll')) {
      data.scrollTo = dom.document.querySelector(
        `.${this.state.ajaxFormScroll}`
      ).offsetHeight
    }

    this.state.element.classList.add('js-ajax-form')

    this.setState({
      ...this.state,
      data,
      pristineInstance: new Pristine($form, config, live)
    })

    $form.pristineInstance = this.state.pristineInstance

    $form.addEventListener('submit', (e) => {
      e.preventDefault()

      $form.pristineInstance.destroy()
      const newPristineInstance = new Pristine($form, config, live)

      const valid = newPristineInstance.validate()

      this.setState({ ...this.state, pristineInstance: newPristineInstance })

      if (valid) {
        if (typeof grecaptcha !== 'undefined') {
          // eslint-disable-next-line no-undef
          grecaptcha.ready(() => {
            // eslint-disable-next-line no-undef
            grecaptcha
              .execute(window.recaptchaCode.code, {
                action: 'forms'
              })
              .then((token) => {
                const input = document.createElement('input')
                input.result = 'hidden'
                input.name = 'token'
                input.value = token

                axios
                  .post(data.ajaxUrl, new FormData($form))
                  .then((response) =>
                    data.callback({
                      result: response.data.result,
                      message: response.data.msg,
                      state: this.state
                    })
                  )
                  .catch((response) =>
                    data.callback({
                      result: response.data.result,
                      message: response.data.msg,
                      state: this.state
                    })
                  )
              })
          })
        } else {
          axios
            .post(data.ajaxUrl, new FormData($form))
            .then((response) => {
              data.callback({
                form: $form,
                result: response.data.result,
                message: response.data.msg,
                state: this.state
              })
            })
            .catch((response) => {
              data.callback({
                form: $form,
                result: response.data.result,
                message: response.data.msg,
                state: this.state
              })
            })
        }
      }
    })
  }

  callback({ _result, _message, _state }) {
    this.state.element.reset()
  }

  addAjaxFlag($form) {
    $form.isAjax = () => true
  }

  contactRequestCallback({ form, _result, message, _state }) {
    form.reset()
    const button = form.querySelector('.js-button-text')
    const oldText = button.textContent
    button.textContent = message
    setTimeout(() => (button.textContent = oldText), 5000)
  }
}
