/**
 * matches() Polyfill - IE 11
 */
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector
}

/**
 * forEach() PolyFill - IE 11
 */
if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

/**
 * closest() Polyfill - IE 11
 */
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    let el = this

    do {
      if (Element.prototype.matches.call(el, s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}

/**
 * CustomEvent Polyfill - IE 11
 */
(function () {
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()

/**
 * classList() PolyFill - IE 11
 * .add(), .remove(), .toggle(), .replace
 */
if ('document' in self) {
  if (
    !('classList' in document.createElement('_')) ||
    (document.createElementNS &&
      !(
        'classList' in
        document.createElementNS('http://www.w3.org/2000/svg', 'g')
      ))
  ) {
    (function (view) {
      'use strict'

      if (!('Element' in view)) return

      const classListProp = 'classList'
      const protoProp = 'prototype'
      const elemCtrProto = view.Element[protoProp]
      const objCtr = Object
      const strTrim =
        String[protoProp].trim ||
        function () {
          return this.replace(/^\s+|\s+$/g, '')
        }
      const arrIndexOf =
        Array[protoProp].indexOf ||
        function (item) {
          let i = 0
          const len = this.length

          for (; i < len; i++) {
            if (i in this && this[i] === item) {
              return i
            }
          }
          return -1
        }

      const DOMEx = function (type, message) {
        this.name = type
        this.code = DOMException[type]
        this.message = message
      }
      const checkTokenAndGetIndex = function (classList, token) {
        if (token === '') {
          throw new DOMEx('SYNTAX_ERR', 'The token must not be empty.')
        }
        if (/\s/.test(token)) {
          throw new DOMEx(
            'INVALID_CHARACTER_ERR',
            'The token must not contain space characters.'
          )
        }
        return arrIndexOf.call(classList, token)
      }
      const ClassList = function (elem) {
        const trimmedClasses = strTrim.call(elem.getAttribute('class') || '')
        const classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
        let i = 0
        const len = classes.length

        for (; i < len; i++) {
          this.push(classes[i])
        }
        this._updateClassName = function () {
          elem.setAttribute('class', this.toString())
        }
      }
      const classListProto = (ClassList[protoProp] = [])
      const classListGetter = function () {
        return new ClassList(this)
      }

      DOMEx[protoProp] = Error[protoProp]
      classListProto.item = function (i) {
        return this[i] || null
      }
      classListProto.contains = function (token) {
        return ~checkTokenAndGetIndex(this, token + '')
      }
      classListProto.add = function () {
        const tokens = arguments
        let i = 0
        const l = tokens.length
        let token
        let updated = false

        do {
          token = tokens[i] + ''
          if (!~checkTokenAndGetIndex(this, token)) {
            this.push(token)
            updated = true
          }
        } while (++i < l)

        if (updated) {
          this._updateClassName()
        }
      }
      classListProto.remove = function () {
        const tokens = arguments
        let i = 0
        const l = tokens.length
        let token
        let updated = false
        let index

        do {
          token = tokens[i] + ''
          index = checkTokenAndGetIndex(this, token)
          while (~index) {
            this.splice(index, 1)
            updated = true
            index = checkTokenAndGetIndex(this, token)
          }
        } while (++i < l)

        if (updated) {
          this._updateClassName()
        }
      }
      classListProto.toggle = function (token, force) {
        const result = this.contains(token)
        const method = result
          ? force !== true && 'remove'
          : force !== false && 'add'

        if (method) {
          this[method](token)
        }

        if (force === true || force === false) {
          return force
        } else {
          return !result
        }
      }
      classListProto.replace = function (token, replacementToken) {
        const index = checkTokenAndGetIndex(token + '')
        if (~index) {
          this.splice(index, 1, replacementToken)
          this._updateClassName()
        }
      }
      classListProto.toString = function () {
        return this.join(' ')
      }

      if (objCtr.defineProperty) {
        const classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        }
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc)
        } catch (ex) {
          if (ex.number === undefined || ex.number === -0x7ff5ec54) {
            classListPropDesc.enumerable = false
            objCtr.defineProperty(
              elemCtrProto,
              classListProp,
              classListPropDesc
            )
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter)
      }
    })(self)
  }

  (function () {
    'use strict'

    let testElement = document.createElement('_')
    testElement.classList.add('c1', 'c2')

    if (!testElement.classList.contains('c2')) {
      const createMethod = function (method) {
        const original = DOMTokenList.prototype[method]

        DOMTokenList.prototype[method] = function (token) {
          let i
          const len = arguments.length

          for (i = 0; i < len; i++) {
            token = arguments[i]
            original.call(this, token)
          }
        }
      }
      createMethod('add')
      createMethod('remove')
    }

    testElement.classList.toggle('c3', false)

    if (testElement.classList.contains('c3')) {
      const _toggle = DOMTokenList.prototype.toggle

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force
        } else {
          return _toggle.call(this, token)
        }
      }
    }

    if (!('replace' in document.createElement('_').classList)) {
      DOMTokenList.prototype.replace = function (token, replacementToken) {
        let tokens = this.toString().split(' ')
        const index = tokens.indexOf(token + '')

        if (~index) {
          tokens = tokens.slice(index)
          this.remove.apply(this, tokens)
          this.add(replacementToken)
          this.add.apply(this, tokens.slice(1))
        }
      }
    }

    testElement = null
  })()
}
