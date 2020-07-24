import Component from '../utils/component'
import browserUpdate from 'browser-update'

export default class BrowserUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const configurationOptions = {
      required: {
        i: 11,
        e: 18,
        f: 70,
        o: 64,
        s: 5,
        c: 49
      }
    }

    browserUpdate(configurationOptions)
  }
}
