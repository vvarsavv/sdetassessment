const adBlockPlus = require('adblock-plus-crx');


module.exports = {
    profiles : {
        chrome: 'chrome',
        api: 'api',
        chromeSelenoid: 'chromeSelenoid',
        firefoxSelenoid: 'firefoxSelenoid',
        operaSelenoid: 'operaSelenoid'
    },
    chrome: {
        url: 'http://localhost',
        browser: "chrome",
        restart: false,
        waitForTimeout: 5000,
        host: process.env.HOST,
        coloredLogs: true,
        keepCookies: true,
        windowSize: '1280x1024',
        smartWait: 10000,
        timeouts: {
            "script": 60000,
            "page load": 10000
        },
        chromeOptions: {
            extensions: adBlockPlus
        }
    },
    api: {
        url: "http://localhost",
        browser: "chrome",
        restart: true,
        waitForTimeout: 5000,
        host: process.env.HOST,
        coloredLogs: true,
        desiredCapabilities: {
            chromeOptions: {
                args: [
                    "--headless",
                    "--disable-gpu",
                    "--lang=en"
                ]
            }
        }
    },
    chromeSelenoid: {
        url: 'http://localhost',
        browser: 'chrome',
        restart: false,
        version: '77.0',
        keepCookies: true,
        smartWait: 10000,
        waitForTimeout: 5000,
        desiredCapabilities: {
            selenoidOptions: {
                enableVNC: true,
                enableVideo: false,
            }
        },
        chromeOptions: {
            extensions: adBlockPlus
        }
    },
    firefoxSelenoid: {
        url: 'http://localhost',
        browser: 'firefox',
        restart: false,
        version: '69.0',
        keepCookies: true,
        smartWait: 10000,
        waitForTimeout: 5000,
        desiredCapabilities: {
            selenoidOptions: {
                enableVNC: true,
                enableVideo: false,
            }
        }
    },
    operaSelenoid: {
        url: 'http://localhost',
        browser: 'opera',
        restart: false,
        version: '63.0',
        keepCookies: true,
        smartWait: 10000,
        waitForTimeout: 5000,
        desiredCapabilities: {
            selenoidOptions: {
                enableVNC: true,
                enableVideo: false,
            }
        }
    },
    loadProfile() {
        const profile = process.env.profile;

        switch(profile) {
            case this.profiles.chrome:
                return this.chrome;
            case this.profiles.api:
                return this.api;
            case this.profiles.chromeSelenoid:
                return this.chromeSelenoid;
            case this.profiles.firefoxSelenoid:
                return this.firefoxSelenoid;
            case this.profiles.operaSelenoid:
                return this.operaSelenoid;
            default:
                return this.chrome;
        }
    }
};