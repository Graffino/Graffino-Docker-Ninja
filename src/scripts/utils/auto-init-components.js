import moduleLoader from './module-loader'

const autoInitComponents = () => {
  Array.from(document.querySelectorAll('[data-component]')).map(element => {
    const componentName = element.dataset.component
    moduleLoader(componentName).then(Component => {
      // eslint-disable-next-line no-unused-vars
      const component = new Component({
        element
      })
    })
  })
}

export default autoInitComponents
