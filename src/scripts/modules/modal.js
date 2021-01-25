import Component from '../utils/component'
import MicroModal from 'micromodal'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  init() {
    // eslint-disable-next-line eqeqeq
    if (typeof Object.assign != 'function') {
      Object.defineProperty(Object, 'assign', {
        value: function assign(target, _letArgs) {
          'use strict'
          if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object')
          }
          const to = Object(target)
          for (let index = 1; index < arguments.length; index++) {
            const nextSource = arguments[index]
            if (nextSource != null) {
              for (const nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey]
                }
              }
            }
          }
          return to
        },
        writable: true,
        configurable: true
      })
    }

    if (!Array.from) {
      Array.from = (function () {
        const toStr = Object.prototype.toString
        const isCallable = function (fn) {
          return (
            typeof fn === 'function' || toStr.call(fn) === '[object Function]'
          )
        }
        const toInteger = function (value) {
          const number = Number(value)
          if (isNaN(number)) {
            return 0
          }
          if (number === 0 || !isFinite(number)) {
            return number
          }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
        }
        const maxSafeInteger = Math.pow(2, 53) - 1
        const toLength = function (value) {
          const len = toInteger(value)
          return Math.min(Math.max(len, 0), maxSafeInteger)
        }

        return function from(arrayLike) {
          const C = this
          const items = Object(arrayLike)
          if (arrayLike == null) {
            throw new TypeError(
              'Array.from requires an array-like object - not null or undefined'
            )
          }
          // eslint-disable-next-line no-void
          const mapFn = arguments.length > 1 ? arguments[1] : void undefined
          let T
          if (typeof mapFn !== 'undefined') {
            if (!isCallable(mapFn)) {
              throw new TypeError(
                'Array.from: when provided, the second argument must be a function'
              )
            }
            if (arguments.length > 2) {
              T = arguments[2]
            }
          }
          const len = toLength(items.length)
          const A = isCallable(C) ? Object(new C(len)) : new Array(len)
          let k = 0
          let kValue
          while (k < len) {
            kValue = items[k]
            if (mapFn) {
              A[k] =
                typeof T === 'undefined'
                  ? mapFn(kValue, k)
                  : mapFn.call(T, kValue, k)
            } else {
              A[k] = kValue
            }
            k += 1
          }
          A.length = len
          return A
        }
      })()
    }
    this.handleMarkup()
  }

  handleMarkup() {
    document.addEventListener('click', (event) => {
      setTimeout(() => {
        if (
          event.target.matches('.js-open-modal') ||
          !!event.target.closest('.js-open-modal')
        ) {
          let target
          if (event.target.matches('.js-open-modal')) {
            target = event.target.dataset.modaltarget
          } else {
            target = event.target.closest('.js-open-modal').dataset.modaltarget
          }
          MicroModal.show(target)
        }
      }, 0)
    })
  }
}
