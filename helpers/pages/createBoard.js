'use strict';

const {I} = inject();

module.exports = {

    locators: {
        plusIcon: '[aria-label*="Profile"]', // add locator to custom_helper -> aria-label is common in create pins
        createBoard: '[title*="Create board"]',
        createBoardWindow: '[aria-label="Create"]', // add locator to custom_helper -> aria-label is common in create pins
    },

    form: {
        boardName: '[name="boardName"]',
        submit: '[type="submit"]',
    },

    addBoardFromMainPage() {
        I.waitForVisible(this.locators.plusIcon);
        I.click(this.locators.plusIcon);
        I.click(this.locators.createBoard);
    },

    createNewBoard() {
        I.waitForElement(this.locators.createBoardWindow);
        I.click(this.locators.createBoard);
        I.fillField(this.form.boardName, 'Test Board');
        //I.click(this.form.submit);
    },
};
