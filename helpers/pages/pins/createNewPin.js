'use strict';

const {I, createBoard, commonLocators} = inject();
//
// // module.exports = {
// //
// //     locators: {
// //         dataTestID: (testID) => {return locate(`[data-test-id*="${testID}"]`)},
// //         dataPinID: (pinId) => {return locate(`[data-pin-id*="${pinId}"]`)},
// //         dataTestPinID: (testPinID) => {return locate(`[data-test-pin-id*="${testPinID}"]`)},
// //         createPin: '[title*="Create Pin"]',
// //         gridCentered: '[class="gridCentered"]',
// //         pinName: '[itemprop="name"]',
// //
// //         dataID: (name) => `[data-test-id*="${name}"]`,
// //         pinsID: (id) => `[data-test-pin-id*="${id}"]`,
// //     },
// //
// //     forms: {
// //         pinTitle: '[placeholder*="title"]',
// //         pinDescription: '[placeholder*="about"]',
// //         pinWebsite: '[placeholder*="website"]',
// //         pinURL: '[placeholder*="destination"]',
// //         pinImage: '[alt*="Image from"]',
// //         validation: {
// //             longTitle: 'Oops! This title is getting long. Try cutting it down.',
// //             longDescription: 'Oops! This description is getting long. Try cutting it down.',
// //             invalidURL: 'Not a valid URL.'
// //         },
// //     },
// //
//
// //********************************************************CREATE NEW PIN METHODS********************************************************
//
// //     /**
// //      * navigate to new pin creation window via UI
// //      */
// //     enterNewPinWindowFromUI() {
// //         I.click('~Saved');
// //         I.click('~Profile actions overflow');
// //         I.waitForEnabled('~Profile actions overflow');
// //         I.click(this.locators.createPin);
// //     },
// //
// //     /**
// //      * enter details in new pin
// //      */
// //     enterValidDetails: async function() {
// //         I.say('Entering valid details');
// //         const pinDetails = await I.createTitleForForm();
// //         const randomImage = await I.parameterDetails();
// //         I.fillField(this.forms.pinTitle, pinDetails.titleName);
// //         I.fillField(this.forms.pinDescription, pinDetails.description);
// //         I.click(this.locators.dataTestID('save-from-site-button'));
// //         I.fillField(this.forms.pinWebsite, randomImage.image_url);
// //         I.click('~Submit');
// //         I.waitForVisible(this.forms.pinImage);
// //         I.click(this.forms.pinImage);
// //         I.click(this.locators.dataTestID('add-button'));
// //         I.click(this.locators.dataTestID('select-button'));
// //     },
// //
// //     /**
// //      * enter invalid details in new pin
// //      */
// //     enterInvalidDetails: async function () {
// //         I.say('Entering invalid details');
// //         const invalidPinDetails = await I.createTitleForForm();
// //         I.fillField(this.forms.pinTitle, invalidPinDetails.invalidNewTitle);
// //         I.fillField(this.forms.pinDescription, invalidPinDetails.invalidDescription);
// //         I.fillField(this.forms.pinURL, invalidPinDetails.titleInvalid);
// //         I.click(this.locators.dataTestID('save-from-site-button'));
// //         I.see(this.forms.validation.longTitle);
// //         I.see(this.forms.validation.longDescription);
// //         I.see(this.forms.validation.invalidURL);
// //     },
// //
// //     /**
// //      * save details of a new pin
// //      */
// //     saveDetailsOfNewPin: async function () {
// //         I.waitForEnabled(this.locators.dataTestID('board-dropdown-save-button'));
// //         I.click(this.locators.dataTestID('board-dropdown-save-button'));
// //         I.waitForVisible('~Your saved Pin.');
// //         I.click(this.locators.dataTestID('seeItNow'));
// //     },
// //
// //     /**
// //      * create a new pin
// //      */
// //     createNewPinFromUI: async function(addDetails) {
// //         this.enterNewPinWindowFromUI();
// //         addDetails === 'validDetails' ?
// //             (await this.enterValidDetails(), await createBoard.numberOfBoardsListFromUI(), await this.saveDetailsOfNewPin())
// //             : await this.enterInvalidDetails();
//     }
//     //todo: assert new pin title name
//     //todo: assert pin title creation
// };

class EnterNewPin {
    constructor() {
        //other locators
        this.createPin = '[title*="Create Pin"]';
        this.savedPin = '~Your saved Pin.';

        //form
        this.pinTitle ='[placeholder*="title"]';
        this.pinDescription = '[placeholder*="about"]';
        this.pinWebsite = '[placeholder*="website"]';
        this.pinImage = '[alt*="Image from"]';
        this.pinURL = '[placeholder*="destination"]';

        //pin validation
        this.longTitle ='Oops! This title is getting long. Try cutting it down.';
        this.longDescription = 'Oops! This description is getting long. Try cutting it down.';
        this.invalidURL = 'Not a valid URL.'
    }

    /**
     * navigate to new pin creation window via UI
     */
    enterNewPinWindowFromUI() {
        I.click(commonLocators.userProfile);
        I.click(commonLocators.profileActions);
        I.waitForEnabled(commonLocators.profileActions);
        I.click(this.createPin);
    }

    /**
     * enter details in new pin
     */
    async enterValidDetails() {
        I.say('Entering valid details');

        const pinDetails = await I.createTitleForForm();
        const randomImage = await I.parameterDetails();
        I.fillField(this.pinTitle, pinDetails.titleName);
        I.fillField(this.pinDescription, pinDetails.description);
        I.click(commonLocators.dataTestID('save-from-site-button'));
        I.fillField(this.pinWebsite, randomImage.image_url);
        I.click(commonLocators.submitButton);
        I.waitForVisible(this.pinImage);
        I.click(this.pinImage);
        I.click(commonLocators.dataTestID('add-button'));
        I.click(commonLocators.dataTestID('select-button'));
    }

    /**
     * enter invalid details
     */
    async enterInvalidDetails() {
        I.say('Entering invalid details');

        const invalidPinDetails = await I.createTitleForForm();
        I.fillField(this.pinTitle, invalidPinDetails.invalidNewTitle);
        I.fillField(this.pinDescription, invalidPinDetails.invalidDescription);
        I.fillField(this.pinURL, invalidPinDetails.titleInvalid);

        I.see(this.longTitle);
        I.see(this.longDescription);
        I.see(this.invalidURL);
    }

    /**
     * save details of a new pin
     */
    async saveDetailsOfNewPin() {
        I.waitForEnabled(commonLocators.dataTestID('board-dropdown-save-button'));
        I.click(commonLocators.dataTestID('board-dropdown-save-button'));
        I.waitForVisible(this.savedPin);
        I.click(commonLocators.dataTestID('seeItNow'));
    }

    /**
     * create a new pin
     */
    async createNewPinFromUI(addDetails) {
        this.enterNewPinWindowFromUI();

        if (addDetails === "validDetails") {
            await this.enterValidDetails();
            await createBoard.numberOfBoardsListFromUI();
            await this.saveDetailsOfNewPin();
        }

        if (addDetails === "invalidDetails") {
            await this.enterInvalidDetails()
        }
    }
}

// for inheritance - page objects as classes cab be extended in other page objects
exports.EnterNewPin = EnterNewPin;
module.exports = new EnterNewPin();