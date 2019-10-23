'use strict';

const {I, userData} = inject();

module.exports = {

    locators: {
        lblGridCentered: '[class="gridCentered"]',
    },

    button: {
        btnHome: '~Home',
        btnGoBack: '~Go back',
        btnEdit: '~Edit',
        btnPreviouslySavedPin: '~Edit your previously saved Pin',
        btnPinsFollow: '~Pins from people you follow',
        btnUserProfile: (user) => `//div[text()="${user}"]`
    },

    menu: {
        mnuContainerButton: '$button-container'
    },

    form: {
        frmTitle: '[id="TitleField"]',
        frmDescription: '[id="DescriptionField"]'
    },

    formValidation: {
        frmTitleLong: 'Title too long. Make sure title has fewer than 100 characters',
        frmDescriptionLong: 'Description too long. Make sure description has fewer than 500 characters'
    },

    /**
     * element and user's name verification in main-page
     */
    verifyElementsInMainPage() {
        I.waitForEnabled(this.locators.lblGridCentered, 10);
        I.waitForElement(this.menu.mnuContainerButton);
        I.seeElement(this.button.btnPinsFollow);
        I.seeTextEquals(userData.USER.MYUSERNAME.firstName, this.button.btnUserProfile(userData.USER.MYUSERNAME.firstName));
    },

    /**
     * Verify pins in main-page
     */
    verifyPinsMainPage() {
        I.click(this.button.btnHome);
        I.waitForEnabled(this.locators.lblGridCentered, 10);
    },

    /**
     * close pin window
     */
    closePinWindow() {
        let closeElement = I.grabNumberOfVisibleElements(this.button.btnGoBack);
        closeElement > 1 ? I.say('No close button visible') : I.click(this.button.btnGoBack);
    },

    /**
     * edit a pin from "Edit this pin" window
     */
    editThisPin() {
        I.click(this.button.btnEdit);
        I.waitForElement(this.button.btnPreviouslySavedPin);
    },

    /**
     * enter valid details in pin edit window
     */
    editPinValidDetails: async function () {
        I.say('Entering valid details');
        const validDetails = await I.generateDetailsForForm();
        I.clearField(this.form.frmTitle);
        I.fillField(this.form.frmTitle, validDetails.titleName);
        I.clearField(this.form.frmDescription);
        I.fillField(this.form.frmDescription, validDetails.description);
    }
};