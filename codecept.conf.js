const webDriverConfig = require('./profiles/webdriver.conf'); // reading selenium config from separate file
const domains = require('./helpers/data/domains');

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
    multiple: {
        parallel: {
            chunks: 1,
            browsers: ["chrome"]
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
          delayBefore: 800,
          delayAfter: 900,
          methods: ["click", "fillField", "waitForEnabled", "waitForElement", "waitForVisible", "waitForInvisible"]
      },
      autologin: {
          enabled: true,
          saveToFile: false,
          inject: 'login',
          users: {
              myUsername: {
                  login: async (I) => I.loginUser(),
              },
          }
      },
      customLocator: {
          enabled: true,
          showActual: true,
          attribute: "data-test-id"
      }
  },
  include: {
      I: './steps_file.js',

      // data
      apiData: './helpers/data/apiData.js',
      userData: './helpers/data/userData.js',
      domains: './helpers/data/domains.js',

      //pins
      createNewPin: './helpers/pages/pins/createNewPin.js',
      pinsNavigation: './helpers/pages/pins/pinsNavigation.js',
      savePins: './helpers/pages/pins/savePins.js',

      //boards
      createNewBoard: './helpers/pages/boards/createNewBoard.js',
      boardsApiCalls: './helpers/pages/boards/boardsApiCalls.js',
      boardsNavigation: './helpers/pages/boards/boardsNavigation.js',
      editBoard: './helpers/pages/boards/editBoard.js',

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