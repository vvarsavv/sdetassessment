module.exports = {
    profiles : {
        chrome: 'chrome',
        firefox: 'firefox',
        api: 'api'
    },
    chrome: {
        url: 'http://localhost',
        browser: "chrome",
        restart: true,
        waitForTimeout: 5000,
        host: process.env.HOST,
        coloredLogs: true
    },
    firefox: {
        url: "http://localhost",
        browser: "firefox",
        restart: true,
        waitForTimeout: 5000,
        host: process.env.HOST,
        coloredLogs: true
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
    loadProfile() {
        const profile = process.env.profile;

        switch(profile) {
            case this.profiles.chrome:
                return this.chrome;
            case this.profiles.firefox:
                return this.firefox;
            case this.profiles.api:
                return this.api;
            default:
                return this.chrome;
        }
    }
};