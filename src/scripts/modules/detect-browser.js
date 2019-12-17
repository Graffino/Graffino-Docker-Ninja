import Component from '../utils/component.js'
import { dom } from '../utils/globals.js'

export default class DetectBrowser extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const isIE = false || !!document.documentMode
    if (isIE) {
      dom.document.body.classList.add('is-ie')
    }
    if (/Edge\/\d./i.test(navigator.userAgent)) {
      dom.document.body.classList.add('is-edge')
    }
  }
}
