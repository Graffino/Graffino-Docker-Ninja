import Component from '../utils/component'
import { dom } from '../utils/globals'
import { loadScriptAsync, unicodeURLDecode } from '../utils/helpers'

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    const { element } = this.state
    const data = {}

    if (Object.keys(this.state).includes('apiKey')) {
      data.apiKey = this.state.apiKey
    }

    if (Object.keys(this.state).includes('lat')) {
      data.lat = this.state.lat
    }

    if (Object.keys(this.state).includes('lng')) {
      data.lng = this.state.lng
    }

    // Add State classes
    this.state.element.classList.add('js-google-maps')
    this.setState({ data })
    const loaded = loadScriptAsync(
      `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`
    )

    loaded.then(() => {
      const allInstances = dom.document.querySelectorAll(
        '.js-google-maps-marker'
      )

      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(element, {
        allowZoom: false,
        scrollwheel: false,
        draggable: true,
        currencySymbol: '&eur;',
        centerOnPin: false,
        zoom: 7,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        scaleControl: false,
        mapTypeControl: false,
        center: {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng)
        }
      })

      Array.from(allInstances).forEach((instance) => {
        const content = `<div class="iw-container" id="iw-container">
              <div class="iw-content">
                <div class="iw-item">
                  <img src="${instance.dataset.image}" class="iw-image">
                </div>
                <h1 class="iw-title">${instance.dataset.title}</h1>
                <p class="iw-description">
                ${unicodeURLDecode(instance.dataset.description)}
                </p>
                <a href="https://www.google.com/maps/dir/Current+Location/${
                  instance.dataset.lat
                },${
          instance.dataset.lng
        }" target="_top" rel="noopener">Arată traseu</a>
              </div>
            </div>`

        // eslint-disable-next-line no-undef
        const infowindow = new google.maps.InfoWindow({
          content: content,
          maxWidth: 282
        })

        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(instance.dataset.lat),
            lng: parseFloat(instance.dataset.lng)
          },
          title: instance.dataset.title,
          icon: instance.dataset.icon,
          clickable: true,
          map: map
        })

        // eslint-disable-next-line no-undef
        google.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker)
        })

        // eslint-disable-next-line no-undef
        google.maps.event.addListener(map, 'click', () => {
          infowindow.close()
        })
      })
    })
  }
}
