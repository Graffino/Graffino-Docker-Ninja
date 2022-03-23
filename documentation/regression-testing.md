# Regression Testing

Project includes regression testing utilities that help you find out if you broke already developed components

## Backstop

For quick local testing we included [Backstop](https://github.com/garris/BackstopJS).

### Configuration

Backstop can be configured via the _backstop.json_ file.

### Setup

To generate the initial setup of Backstop, run `yarn test:regression:setup`. This only needs to run once.

### Create Reference

To create initial and subsequent references run `yarn test:regression:reference`.

### Testing

To test the current development version against the initial state run `yarn test`. Any regresions will be displayed visually.

#### Approving Test

To approve the previous test run `yarn test:regression:approve`.
