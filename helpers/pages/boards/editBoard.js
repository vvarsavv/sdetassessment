'use strict';

const {I, boardsNavigation} = inject();

module.exports = {

    button: {
        btnEdit: '~Edit board',
        btnSubmit: '[type="submit"]'
    },

    form: {
        frmBoardEditWindow: '[class*="BoardEdit"]',
        frmName: 'Name',
        frmDescription: 'Description',
        frmCategory: 'Category',
        frmEditDetails: (form) => `[id="boardEdit${form}"]`
    },

    formValidation: {
        frmTitleLong: 'Please enter no more than 50 characters.',
        frmDescriptionLong: 'Please enter no more than 500 characters.'
    },

    /**
     * enter in the board's edit window
     */
    enterBoardsEditWindow: async function() {
        await boardsNavigation.clickOnRandomBoardFromUserProfile();
        I.click(this.button.btnEdit);
        I.waitForElement(this.form.frmBoardEditWindow);
    },

    /**
     * insert valid details in the board's edit window
     */
    enterValidDetails: async function () {
        const boardDetails = await I.generateDetailsForForm();
        await this.enterBoardsEditWindow();
        I.fillField(this.form.frmEditDetails(this.form.frmName), boardDetails.titleName);
        I.fillField(this.form.frmEditDetails(this.form.frmDescription), boardDetails.description);
        I.selectOption(this.form.frmEditDetails(this.form.frmCategory), 'architecture');
        I.click(this.button.btnSubmit);
    },

    /**
     * insert invalid details in the board's edit window
     */
    enterInvalidDetails: async function() {
        const invalidBoardDetails = await I.generateDetailsForForm();
        await this.enterBoardsEditWindow();
        I.fillField(this.form.frmEditDetails(this.form.frmName), invalidBoardDetails.invalidNewTitle);
        I.fillField(this.form.frmEditDetails(this.form.frmDescription), invalidBoardDetails.invalidDescription);
        I.see(this.formValidation.frmTitleLong);
        I.see(this.formValidation.frmDescriptionLong);
    }
};