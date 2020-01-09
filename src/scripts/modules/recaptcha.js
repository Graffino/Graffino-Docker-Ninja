import Component from '../utils/component.js'
import { loadScript } from '../utils/helper-functions.js'
import { dom } from '../utils/globals.js'

export default class Recaptcha extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    var recaptchaApi = this.state.element.dataset.recaptcha
    window.recaptchaCode = {}
    recaptchaCode.code = recaptchaApi
    loadScript(`https://www.google.com/recaptcha/api.js?render=${recaptchaApi}`, function () {
    })
  }
}
