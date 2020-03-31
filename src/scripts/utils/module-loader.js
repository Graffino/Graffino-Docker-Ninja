const moduleLoader = async (componentName) => {
  const { default: module } = await import(`../modules/${componentName}`)
  return module
}

export default moduleLoader
