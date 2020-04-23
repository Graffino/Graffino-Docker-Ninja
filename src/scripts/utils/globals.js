const stateClass = {
  open: 'is-open',
  expanded: 'is-expanded',
  active: 'is-active',
  hidden: 'is-hidden',
  sticky: 'is-sticky',
  floating: 'is-floating',
  top: 'is-top',
  bottom: 'is-bottom',
  notValid: 'not-valid',
  current: 'is-current',
  visible: 'is-visible',
  focused: 'is-focused',
  touched: 'is-touched',
  loading: 'is-loading',
  hasArrow: 'has-arrow',
  overlay: 'has-overlay',
  animated: 'is-animated',
  submitted: 'is-submitted',
  minimized: 'is-minimized',
  scrollable: 'is-scrollable',
  overflow: 'is-overflow',
  pinned: 'is-pinned',
  unpinned: 'is-unpinned',
  error: 'is-error',
  disabled: 'is-disabled',
  desktop: 'is-desktop',
  mobile: 'is-mobile'
}

const breakpoints = {
  xlarge: '1250',
  desktop: '1120',
  large: '1050',
  medium: '940',
  tablet: '768',
  small: '640',
  xsmall: '480',
  mobileLarge: '414',
  mobileMedium: '375',
  mobileSmall: '320'
}

const dom = {
  window,
  document,
  html: document.querySelector('html')
}

const ease = {
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutBack: [0.175, 0.885, 0.32, 1.275]
}

const validateOptions = {
  classTo: 'form__field',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'form__field',
  errorTextTag: 'div',
  errorTextClass: 'form__error text-danger'
}

const choicesOptions = {
  searchEnabled: false
}

export { stateClass, breakpoints, ease, dom, validateOptions, choicesOptions }
