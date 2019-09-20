import moduleLoader from './module-loader'

const autoInitComponents = () => {
  Array.from(document.querySelectorAll('[data-component]')).map(element => {
    const componentName = element.dataset.component.split(' ')
    if (componentName.length === 1) {
      moduleLoader(componentName[0]).then(Component => {
        // eslint-disable-next-line no-unused-vars
        const compontent = new Component({
          element
        })
      })
    } else {
      componentName.map(elem => {
        moduleLoader(elem).then(Component => {
          // eslint-disable-next-line no-unused-vars
          const compontent = new Component({
            element
          })
        })
      })
    }
  })
}

export default autoInitComponents
