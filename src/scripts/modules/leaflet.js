import Component from '../utils/component'
import L from 'leaflet'
import 'leaflet.tilelayer.colorfilter'

export default class LeafletMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const { element } = this.state
    const markers = element.children
    const map = L.map(element.id).setView([45.9442858, 25.00943039], 7)
    const LeafIcon = L.Icon.extend({
      options: {
        iconSize: [36, 44],
        iconAnchor: [48, 48],
        popupAnchor: [-3, -76]
      }
    })
    const orangeFilter = [
      'grayscale: 100%',
      'sepia: 10%',
      'brightness: 110%',
      'saturate: 90%'
    ]
    const orangeIcon = new LeafIcon({
      iconUrl: element.dataset.markerIcon
    })

    L.tileLayer
      .colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        filter: orangeFilter
      })
      .addTo(map)
    Array.from(markers).map((marker) => {
      L.marker([marker.dataset.lat, marker.dataset.lang], {
        icon: orangeIcon
      }).addTo(map)
    })
  }
}
