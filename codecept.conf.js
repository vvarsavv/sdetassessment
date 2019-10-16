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
          delayBefore: 800,
          delayAfter: 800,
          methods: ["click", "fillField", "waitForEnabled"]
      },
      autologin: {
          enabled: true,
          saveToFile: false,
          inject: 'login',
          users: {
              myUsername: {
                  login: (I) => I.loginUser(),
              },
              check: (I) => {
                  I.amOnPage(domains.PINTEREST_URL.domain);
                  I.see('Kris');
              },
              fetch: () => {}, // empty function
              restore: () => {}, // empty funciton
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

    // pages
      commonLocators: './helpers/pages/commonLocators.js',

      //pins
      createNewPin: './helpers/pages/pins/createNewPin.js',
      pinsNavigation: './helpers/pages/pins/pinsNavigation.js',
      savePins: './helpers/pages/pins/savePins.js',

      //boards
      createNewBoard: './helpers/pages/boards/createNewBoard.js',
      boardsApiCalls: './helpers/pages/boards/boardsApiCalls.js',
      boardsNavigation: './helpers/pages/boards/boardsNavigation.js',

      //sections
      createSections: './helpers/pages/sections/createSections.js'
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