import Component from '../utils/component'
import { dom } from '../utils/globals'
import videojs from 'video.js'

export default class Video extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const myPlayer = videojs('my-player')
    const player = dom.document.getElementById('my-player')
    const buttonPlay = dom.document.getElementsByClassName('js-start-video')
    let playing = false

    myPlayer.controlBar.el_.remove()
    myPlayer.textTrackSettings.el_.remove()
    myPlayer.bigPlayButton.el_.remove()
    myPlayer.loadingSpinner.el_.remove()
    myPlayer.errorDisplay.el_.remove()
    window.myplayer = myPlayer

    player.addEventListener('click', (e) => {
      e.preventDefault()
      if (playing) {
        buttonPlay[0].classList.remove('is-hidden')
        myPlayer.pause()
        playing = false
      } else {
        buttonPlay[0].classList.add('is-hidden')
        myPlayer.play()
        playing = true
      }
    })
  }
}
