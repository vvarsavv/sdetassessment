const tokenDetails = require('../../yourLoginDetails');

module.exports = {

    PINTEREST_API_URL: 'https://api.pinterest.com/v1',
    TOKEN: tokenDetails.enterYourDetails().apiToken,

    CALLS: {
        ME: '/me',
        BOARDS: '/boards/',
        PINS: '/pins/',
        SECTIONS: '/sections/'
    }
};