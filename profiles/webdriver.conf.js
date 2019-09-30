module.exports = {
    profiles : {
        chrome: 'chrome',
        firefox: 'firefox'
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
    loadProfile() {
        const profile = process.env.profile;

        switch(profile) {
            case this.profiles.chrome:
                return this.chrome;
            case this.profiles.firefox:
                return this.firefox;
            default:
                return this.chrome;
        }
    }
};