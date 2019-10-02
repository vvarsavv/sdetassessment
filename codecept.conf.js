const webDriverConfig = require('./profiles/webdriver.conf'); // reading selenium config from separate file

exports.config = {
  tests: './*/*/*_test.js',
  output: './output',
  helpers: {
    WebDriver: webDriverConfig.loadProfile(),
    REST: {},
  },
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    },
    allure: {
      enableScreenshotDiffPlugin: true,
    },
    screenshotOnFail: {
      enabled: true
    }
  },
  include: {
    I: './steps_file.js',

    // data
    apiData: './helpers/data/apiData.js',
    userData: './helpers/data/userData.js',
    domains: './helpers/data/domains.js',

    // pages
    createBoard: './helpers/pages/createBoard.js',
    createPins: './helpers/pages/createPins.js',

    // steps
    loginSteps: './helpers/steps/loginSteps.js'
  },
  bootstrap: null,
  mocha: {
    // reporterOptions: {
    //   reportDir: './output',
    //   reportFilename: 'pnterest sdet assessment'
    // }
  },
  name: 'sdetassessment'
};