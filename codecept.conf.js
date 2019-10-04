const webDriverConfig = require('./profiles/webdriver.conf'); // reading selenium config from separate file

exports.config = {
  tests: './*/*/*_test.js',
  output: './output',
  helpers: {
      WebDriver: webDriverConfig.loadProfile(),
        REST: {
          'Content-Type': 'application/x-www-form-urlencoded', 'x-li-format': 'json'
        },
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
      screenshotOnFail: {
          enabled: true
      },
      autoDelay: {
          enabled: true,
          delayBefore: 500,
          delayAfter: 500,
      },
      autologin: {
          enabled: true,
          saveToFile: false,
          inject: 'login',
          users: {
              user: {
                  login: (I) => I.loginUser(),
                  // fetch: () => {},

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