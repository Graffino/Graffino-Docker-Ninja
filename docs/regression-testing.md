# Regression Testing

Ninja includes regression testing utilities that help you find out if you broke already developed components

## Cypress

  For quick local testing we included [Backstop](https://github.com/garris/BackstopJS).

### Initial State

For initial application state and subsequent updates run `yarn test:regression:approve`.

### Testing

To test the current development version against the initial state run `yarn test`. Any regresions will be displayed visually.
