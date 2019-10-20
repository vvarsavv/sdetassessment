'use strict';

const {I, boardsNavigation} = inject();

class EnterNewPin {
    constructor() {

        //buttons
        this.button = {
            btnUserProfile: '~Saved',
            btnProfileActions: '~Profile actions overflow',
            btnAddToPin: '$scrape-view-add-button',
            btnCreatePin: '[title*="Create Pin"]',
            btnSavedPin: '~Your saved Pin.',
            btnSubmit: '~Submit',
            btnAddFromSite: '$save-from-site-button',
            btnBoardDropDownSave: '$board-dropdown-save-button',
            btnSeeItNow: '$seeItNow',
            btnCancel: '$scrape-view-cancel-button',
            btnAttachImage: '[id="media-upload-input"]'
        };

        //form
        this.form = {
            frmPinTitle:'[placeholder*="title"]',
            frmPinDescription: '[placeholder*="about"]',
            frmPinWebsite: '[placeholder*="website"]',
            frmPinImage: '[alt*="Image from"]',
            frmDestination: '[placeholder*="destination"]',
            frmPinBuilderDraft: '$pin-builder-draft',

        };

        //form validation
        this.formValidation = {
            longTitle: 'Oops! This title is getting long. Try cutting it down.',
            longDescription:'Oops! This description is getting long. Try cutting it down.',
            invalidURL: 'Not a valid URL.',
        };

        this.text = {
            txtSavedToBoard: (boardName) => `//h1[text()="Saved to ${boardName}"]`
        }
    };

    /**
     * navigate to pin builder
     */
    openPinBuilder() {
        I.click(this.button.btnUserProfile);
        I.click(this.button.btnProfileActions);
        I.waitForEnabled(this.button.btnProfileActions);
        I.click(this.button.btnCreatePin);
    };

    /**
     * check if image is uploaded from the coolImages library, if not attach local image
     */
    async checkImageUpload () {
        I.waitForElement(this.form.frmPinBuilderDraft);
        const responseCode = await I.grabNumberOfVisibleElements(this.form.frmPinImage);
        if (responseCode < '1') {
            I.say('Image retrieved from coolImages library not found');
            I.click(this.button.btnCancel);
            I.attachFile(this.button.btnAttachImage, '/helpers/data/image/valletta-image.jpg')
        }
        else {
            I.waitForVisible(this.form.frmPinImage);
            I.click(this.form.frmPinImage);
            I.click(this.button.btnAddToPin);
        }
    };

    /**
     * enter details in new pin
     */
    async enterValidDetails() {
        I.say('Entering valid details');

        const pinDetails = await I.generateDetailsForForm();
        I.fillField(this.form.frmPinTitle, pinDetails.titleName);
        I.fillField(this.form.frmPinDescription, pinDetails.description);
        I.click(this.button.btnAddFromSite);
        I.fillField(this.form.frmPinWebsite, pinDetails.image);
        I.click(this.button.btnSubmit);
        await this.checkImageUpload();
        I.click(this.button.btnBoardDropDownSave);
        const boardName = await boardsNavigation.grabNumberOfBoardsFromUI();
        await this.saveDetailsOfNewPin(boardName.filterBoardsName);
    };

    /**
     * enter invalid details
     */
    async enterInvalidDetails() {
        I.say('Entering invalid details');

        const invalidPinDetails = await I.generateDetailsForForm();
        I.fillField(this.form.frmPinTitle, invalidPinDetails.invalidNewTitle);
        I.fillField(this.form.frmPinDescription, invalidPinDetails.invalidDescription);
        I.fillField(this.form.frmDestination, invalidPinDetails.invalidCharacters);
        I.click(this.button.btnAddFromSite);
        I.fillField(this.form.frmPinWebsite, invalidPinDetails.invalidCharacters);
        I.click(this.button.btnSubmit);
        I.see(this.formValidation.longTitle);
        I.see(this.formValidation.longDescription);
        I.see(this.formValidation.invalidURL);
    };

    /**
     * save details of a new pin
     */
    async saveDetailsOfNewPin(boardName) {
        I.waitForEnabled(this.button.btnBoardDropDownSave);
        I.click(this.button.btnBoardDropDownSave);
        I.waitForVisible(this.button.btnSavedPin);
        I.seeElement(this.text.txtSavedToBoard(boardName));
        I.say(`Pin saved to ${boardName}`);
        I.click(this.button.btnSeeItNow);
    };
}

// for inheritance - page objects as classes can be extended in other page objects ---- specify in readme -> Codeceptjs allows to use classes as page objects
exports.EnterNewPin = EnterNewPin;
module.exports = new EnterNewPin();