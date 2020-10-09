import Component from '../utils/component'
import { loadScript } from '../utils/helpers'

export default class Recaptcha extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    var recaptchaApi = this.state.element.dataset.recaptcha
    window.recaptchaCode = {}
    // eslint-disable-next-line no-undef
    recaptchaCode.code = recaptchaApi
    loadScript(
      `https://www.google.com/recaptcha/api.js?render=${recaptchaApi}`,
      function () {}
    )
  }
}
