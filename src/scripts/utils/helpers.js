const wrap = (el, wrapper) => {
  el.parentNode.insertBefore(wrapper, el)
  wrapper.appendChild(el)
}

const getIndex = (el) => {
  return parseInt(el.dataset.index)
}

const toSnakeCase = (string) => {
  let str = string.replace(/[^\w\s]/g, '')
  str = string.replace(/\s+/g, ' ')
  return str.toLowerCase().split(' ').join('_')
}

const getInitialTransformValue = (element, property) => {
  const transform = document.querySelector(element).getAttribute('transform')

  const translate = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(transform)
  const rotate = /rotate\(\s*([^\s,)]+)\)/.exec(transform)
  const scale = /scale\(\s*([^\s,)]+)\)/.exec(transform)

  switch (property) {
    case 'X':
      return translate[1]
    case 'Y':
      return translate[2]
    case 'rotate':
      return rotate
    case 'scale':
      return scale[1]
    default:
      return ''
  }
}

const isTrue = (value) => {
  return value === 'true'
}

const hasPassiveSupport = () => {
  let passiveSupported = false

  try {
    const options = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: function () {
        passiveSupported = true
      }
    })

    window.addEventListener('test', null, options)
  // eslint-disable-next-line no-empty
  } catch (err) {}

  return passiveSupported
}

const isTouchDevice = () => {
  return !!('ontouchstart' in window)
}

const loadScript = (url, callback) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = function () {
      callback()
    }
  }

  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

const loadScriptAsync = (uri) => {
  return new Promise((resolve, _reject) => {
    const tag = document.createElement('script')
    tag.src = uri
    tag.async = true
    tag.id = 'google-maps'
    tag.onload = () => {
      resolve()
    }
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })
}

const unicodeURLDecode = (str) => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

export {
  wrap,
  getIndex,
  toSnakeCase,
  getInitialTransformValue,
  isTrue,
  hasPassiveSupport,
  isTouchDevice,
  loadScript,
  loadScriptAsync,
  unicodeURLDecode
}
