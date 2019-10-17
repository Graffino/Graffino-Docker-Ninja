import moduleLoader from './module-loader'

const autoInitComponents = () => {
  Array.from(document.querySelectorAll('[data-component]')).map(element => {
    const componentName = element.dataset.component.split(' ')
    let props = []

    Object.keys(element.dataset)
      .filter(prop => prop.includes('prop'))
      .map(key => {
        const propKey = `${key.replace('prop', '').charAt(0).toLowerCase()}${key.replace('prop', '').substring(1)}`
        props = { ...props, [`${propKey}`]: element.dataset[key] }
      })

    if (componentName.length === 1) {
      moduleLoader(componentName[0]).then(Component => {
        // eslint-disable-next-line no-new
        new Component({
          element,
          ...props
        })
      })
    } else {
      componentName.map(elem => {
        moduleLoader(elem).then(Component => {
          // eslint-disable-next-line no-new
          new Component({
            element,
            ...props
          })
        })
      })
    }
  })
}

export default autoInitComponents
