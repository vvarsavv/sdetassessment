const webDriverConfig = require('./profiles/webdriver.conf'); // reading selenium config from separate file

exports.config = {
  tests: './*/*/*_tests.js',
  output: './output',
  helpers: {
      WebDriver: webDriverConfig.loadProfile(),
        REST: {},
      MyHelper: {
          require: './helpers/custom_helper/myHelper.js'
      }
  },
  plugins: {
      wdio: {
          enabled: true,
          services: ['selenium-standalone']
    },
      allure: {
          enableScreenshotDiffPlugin: true,
      },
      retryFailedStep: {
          enabled: true,
          retries: 2
      },
      screenshotOnFail: {
          enabled: true
      },
      autoDelay: {
          enabled: true,
          delayBefore: 600,
          delayAfter: 800,
      },
      autologin: {
          enabled: true,
          saveToFile: false,
          inject: 'login',
          users: {
              user: {
                  login: (I) => I.loginUser(),
              }
          }
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
    createSections: './helpers/pages/createSections.js'
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: './output',
      reportFilename: 'pinterest sdet assessment'
    }
  },
  name: 'sdetassessment'
};