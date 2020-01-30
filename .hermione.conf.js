module.exports = {
  sets: {
    regression: {
      files: 'tests/regression'
    },
    unit: {
      files: 'tests/unit'
    },
    integration: {
      files: 'tests/integration'
    }
  },
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://localhost:4444/wd/hub',
  compositeImage: true,
  screenshotsDir: 'tests/approved',
  browsers: {
    chromeXL: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless'],
        },
      },
      windowSize: '1920x1080',
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless'],
        },
      },
      windowSize: '1280x720',
    },
    chromeMobile: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless'],
        },
      },
      windowSize: {
        width: 414,
        height: 800
      },
    }
  },

  plugins: {
    'html-reporter/hermione': {
      enabled: true,
      path: 'tests/reports',
      defaultView: 'all',
      baseHost: 'http://localhost:3000'
    }
  }
};
