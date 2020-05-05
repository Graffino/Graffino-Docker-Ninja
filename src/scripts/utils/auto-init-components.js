import moduleLoader from './module-loader'

const camelCase = function (string) {
  return string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })
}

const autoInitComponents = () => {
  Array.from(document.querySelectorAll('[data-component]')).map((element) => {
    const componentName = element.dataset.component.split(' ')
    let props = {}
    let refs = {}

    Object.keys(element.dataset)
      .filter((prop) => prop.includes('prop'))
      .map((key) => {
        const propKey = `${key
          .replace('prop', '')
          .charAt(0)
          .toLowerCase()}${key.replace('prop', '').substring(1)}`
        props = { ...props, [`${propKey}`]: element.dataset[key] }
      })

    Array.from(element.querySelectorAll('[data-ref]'))
      .map(el => {
        refs = { ...refs, [`${camelCase(el.dataset.ref)}`]: el }
      })

    if (componentName.length === 1) {
      moduleLoader(componentName[0]).then((Component) => {
        // eslint-disable-next-line no-new
        new Component({
          element,
          props,
          refs
        })
      })
    } else {
      componentName.map((elem) => {
        moduleLoader(elem).then((Component) => {
          // eslint-disable-next-line no-new
          new Component({
            element,
            props,
            refs
          })
        })
      })
    }
  })
}

export default autoInitComponents
