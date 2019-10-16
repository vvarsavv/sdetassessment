module.exports = {

        //common locators
        dataPinID: (pinId) => {
            return locate(`[data-pin-id*="${pinId}"]`)
        },
        dataTestPinID: (testPinID) => {
            return locate(`[data-test-pin-id*="${testPinID}"]`)
        },

        //common aria-label-locators
        userProfile: '~Saved',
        profileActions: '~Profile actions overflow',
        submitButton: '~Submit',
        closePopup: '~close',
        loading: '~Loading',
};