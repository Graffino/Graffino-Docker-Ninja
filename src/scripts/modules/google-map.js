import Component from '../utils/component'
import { loadScript } from '../utils/helpers'

export default class GoogleMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const { element } = this.state
    const apiKey = element.dataset.apikey

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`, function () {
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(element, {
        allowZoom: false,
        scrollwheel: false,
        draggable: true,
        currencySymbol: '$',
        centerOnPin: false,
        zoom: 13,
        mapTypeId: 'roadmap',
        disableDefaultUI: false,
        scaleControl: false,
        mapTypeControl: false,
        center: {
          lat: parseFloat(element.dataset.lat),
          lng: parseFloat(element.dataset.lng)
        }
      })
      // eslint-disable-next-line no-undef
      directionsRenderer.setMap(map)
    })
  }
}
