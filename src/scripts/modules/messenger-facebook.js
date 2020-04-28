import Component from '../utils/component'
import { loadScriptAsync } from '../utils/helpers'

export default class MessengerFacebook extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}

    if (Object.keys(this.state).includes('language')) {
      data.language = this.state.language
    } else {
      data.language = 'ro_RO'
    }

    this.setState({ data })

    const loaded = loadScriptAsync(
      `https://connect.facebook.net/${this.state.data.language}/sdk/xfbml.customerchat.js`
    )

    loaded.then(() => {
      // eslint-disable-next-line no-undef
      FB.init({
        xfbml: true,
        version: 'v6.0'
      })
    })
  }
}
