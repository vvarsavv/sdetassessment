module.exports = {

        dataTestID: (testID) => {
            return locate(`[data-test-id*="${testID}"]`)
        },
        dataPinID: (pinId) => {
            return locate(`[data-pin-id*="${pinId}"]`)
        },
        dataTestPinID: (testPinID) => {
            return locate(`[data-test-pin-id*="${testPinID}"]`)
        },

        //aria-label-locators
        userProfile: '~Saved',
        profileActions: '~Profile actions overflow',
        submitButton: '~Submit',
        closePopup: '~close',
        loading: '~Loading',

        // createPin: '[title*="Create Pin"]',
        // gridCentered: '[class="gridCentered"]',
        // pinName: '[itemprop="name"]',

        dataID: (name) => `[data-test-id*="${name}"]`,
        pinsID: (id) => `[data-test-pin-id*="${id}"]`,

};