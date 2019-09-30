const webDriverConfig = require('./profiles/webdriver.conf'); // reading selenium config from separate file

exports.config = {
  tests: './*/*_test.js',
  output: './output',
  helpers: {
    WebDriver: webDriverConfig.loadProfile()
  },
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    },
    allure: {
      enableScreenshotDiffPlugin: true,
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: './output',
      reportFilename: 'pnterest sdet assessment'
    }
  },
  name: 'sdetassessment'
}