import Component from '../utils/component'
import { stateClass } from '../utils/globals'
import axios from 'axios'

export default class AjaxForm extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const AJAX_URL = window.location.origin + '/wp-admin/admin-ajax.php'
    const form = this.state.element
    this.ajaxHandler = this

    if (this.state.disclaimer) {
      this.handleDisclaimer()
    }

    const feedbackBox = document.getElementsByClassName('js-feedback-box')[0]

    this.addAjaxFlag(this.state.element)

    this.setState({ ...this.state, feedbackBox })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (this.state.element.validate()) {
        // eslint-disable-next-line no-undef
        grecaptcha.ready(() => {
          // eslint-disable-next-line no-undef
          grecaptcha
            .execute(window.recaptchaCode.code, {
              action: 'forms'
            })
            .then((token) => {
              const input = document.createElement('input')
              input.type = 'hidden'
              input.name = 'token'
              input.value = token

              axios
                .post(AJAX_URL, new FormData(form))
                .then((response) =>
                  this.responseCallback({
                    type: response.data.result,
                    msg: response.data.msg
                  })
                )
                .catch((error) =>
                  this.responseCallback({
                    type: 'error',
                    msg: error
                  })
                )
            })
        })
      }
    })
  }

  onScroll () {
    if (document.querySelector('.form__container') !== null) {
      if (
        document
          .querySelector('.form__container')
          .classList.contains('disclaimer-shown')
      ) {
        const disclaimer = document.querySelector('.form__container')
        disclaimer.classList.remove('disclaimer-shown')
      }
    }
  }

  responseCallback ({ type, msg }) {
    this.state.element.classList.add(stateClass.hidden)
    const feedbackBoxModal = document.getElementsByClassName(
      'js-feedback-box-modal'
    )[0]

    if (feedbackBoxModal !== undefined) {
      feedbackBoxModal.classList.add(stateClass.visible)
    }

    this.state.feedbackBox.classList.add(stateClass.visible)
    if (this.state.element.querySelector('.form__container') !== null) {
      this.state.element
        .querySelector('.form__container')
        .classList.add('disclaimer-shown')
    }

    if (this.state.customMessage === undefined) {
      this.state.feedbackBox.textContent = msg
      if (feedbackBoxModal !== undefined) {
        feedbackBoxModal.innerHTML = `<div class="form__message is-success">${msg}</div>`
      }
    }

    if (this.state.customMessage !== 'html') {
      if (this.state.customMessage && msg !== null && type !== 'error') {
        this.state.feedbackBox.innerHTML = `<div class="form__message is-error">${this.state.customMessage}</div>`
      }
    }

    this.state.element.reset()

    if (type === 'error') {
      this.state.feedbackBox.classList.remove('-type-error')
    }

    setTimeout(() => {
      this.state.element.classList.remove(stateClass.hidden)
      if (!this.state.disappears) {
        this.state.feedbackBox.classList.remove(stateClass.visible)
      }

      if (this.state.disappears) {
        this.state.element.classList.add(stateClass.hidden)
        this.state.feedbackBox.classList.add(stateClass.visible)
      }

      if (type === 'error') {
        this.state.feedbackBox.classList.remove('-type-error')
      }
    }, 5000)
  }

  resetForm () {
    this.state.element.classList.remove(stateClass.hidden)
    this.state.feedbackBox.classList.remove(stateClass.visible)
  }

  addAjaxFlag (form) {
    form.isAjax = () => true
  }

  handleDisclaimer () {
    let userTyped = false
    const inputs = this.state.element.querySelectorAll('input')

    inputs.forEach((input) => {
      input.addEventListener('keyup', () => {
        userTyped = true
        if (userTyped) {
          this.state.element
            .querySelector('.form__container')
            .classList.add('disclaimer-shown')
        }
      })
    })
  }
}
