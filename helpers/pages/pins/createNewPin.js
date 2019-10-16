'use strict';

const {I, createNewBoard, commonLocators} = inject();

//todo: assert new pin title name
//todo: assert pin title creation

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
        I.click('$save-from-site-button');
        I.fillField(this.pinWebsite, randomImage.image_url);
        I.click(commonLocators.submitButton);
        I.waitForVisible(this.pinImage);
        I.click(this.pinImage);
        I.click('$add-button');
        I.click('$select-button');
    }

    /**
     * enter invalid details
     */
    async enterInvalidDetails() {
        I.say('Entering invalid details');

        const invalidPinDetails = await I.createTitleForForm();
        I.fillField(this.pinTitle, invalidPinDetails.invalidNewTitle);
        I.fillField(this.pinDescription, invalidPinDetails.invalidDescription);
        I.fillField(this.pinURL, invalidPinDetails.invalidCharacters);
        I.click('$save-from-site-button');
        I.fillField(this.pinWebsite, invalidPinDetails.invalidCharacters);
        I.click(commonLocators.submitButton);
        I.see(this.longTitle);
        I.see(this.longDescription);
        I.see(this.invalidURL);
    }

    /**
     * save details of a new pin
     */
    async saveDetailsOfNewPin() {
        I.waitForEnabled('$board-dropdown-save-button');
        I.click('$board-dropdown-save-button');
        I.waitForVisible(this.savedPin);
        I.click('$seeItNow');
    }

    /**
     * create a new pin
     */
    async createNewPinFromUI(addDetails) {
        this.enterNewPinWindowFromUI();

        if (addDetails === "validDetails") {
            await this.enterValidDetails();
            await createNewBoard.numberOfBoardsListFromUI();
            await this.saveDetailsOfNewPin();
        }

        if (addDetails === "invalidDetails") {
            await this.enterInvalidDetails()
        }
    }
}

// for inheritance - page objects as classes can be extended in other page objects
exports.EnterNewPin = EnterNewPin;
module.exports = new EnterNewPin();