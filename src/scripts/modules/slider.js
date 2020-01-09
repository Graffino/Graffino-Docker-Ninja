import Component from '../utils/component'
import Swiper from 'swiper'

export default class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const data = {}
    const element = this.state.element
    data.slides = 3

    window.dataset = element.dataset
    if (Object.keys(element.dataset).includes('slides')) {
      data.slides = parseInt(element.dataset.slides, 10)
    }

    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 24,
      slidesPerView: data.slides,
      observer: true,
      observeParents: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        640: {
          spaceBetween: 10
        }
      }
    })

    // eslint-disable-next-line no-unused-vars
    const gallery = new Swiper('.gallery', {
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      }
    })
  }
}
