import Component from '../utils/component'
import { dom } from '../utils/globals'
import axios from 'axios'

export default class AjaxForm extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
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
      pristineInstance: this.state.element.pristineInstance
    })

    $form.addEventListener('submit', (e) => {
      e.preventDefault()

      $form.pristineInstance.destroy()
      const newForm = dom.document.querySelector('.js-ajax-form')
      const newPristineInstance = new $form.Pristine(
        newForm,
        $form.pristineConfig,
        true
      )

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
                      message: response.data.message,
                      state: this.state
                    })
                  )
                  .catch((response) =>
                    data.callback({
                      result: response.data.result,
                      message: response.data.message,
                      state: this.state
                    })
                  )
              })
          })
        } else {
          axios
            .post(data.ajaxUrl, new FormData($form))
            .then((response) =>
              data.callback({
                result: response.data.result,
                message: response.data.message,
                state: this.state
              })
            )
            .catch((response) =>
              data.callback({
                result: response.data.result,
                message: response.data.message,
                state: this.state
              })
            )
        }
      }
    })
  }

  callback ({ result, message, state }) {
    this.state.element.reset()
  }

  addAjaxFlag ($form) {
    $form.isAjax = () => true
  }

  customCallback ({ result, message, state }) {}
}
