const yourUserDetails = require('../../yourDetails');

module.exports = {

    USER: {
        MYUSERNAME: {
            username: yourUserDetails.enterYourDetails().yourUsername,
            password: yourUserDetails.enterYourDetails().yourPassword,
            firstName: yourUserDetails.enterYourDetails().yourName,
            lastName: yourUserDetails.enterYourDetails().yourSurname,
            profileURL: yourUserDetails.enterYourDetails().yourProfileURL,
        },
        INVALIDDETAILS: {
            username: '',
            password: '',
        }
    }
};