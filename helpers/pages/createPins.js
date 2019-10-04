'use strict';

const {I, createBoard} = inject();

module.exports = {

    locators: {
        pinClass: '[class*="PinRep"]',
        dataID: (name) => `[data-test-id="${name}"]`,
        pinsID: (id) => `[data-test-pin-id="${id}"]`,
        chooseBoard: '[aria-label="Choose board"]' // add locator to custom_helper -> aria-label is common in create boards
    },

    /**
     * Verify elements in Pin window
     */
    verifyElementsPinWindow() {
        I.waitForVisible(this.locators.dataID('gradient'));
        I.seeElement(this.locators.dataID('PinBetterSaveButton'));
    },

    /**
     * Clicks on a random pin from the homepage
     */
    clickRandomPin: async function() {
        I.waitForVisible(this.locators.dataID('pin'), 10);
        let pins = await I.grabAttributeFrom(this.locators.dataID('pin'), 'data-test-pin-id');
        let filterPins = pins.toString().split(',')[Math.floor(Math.random() * 25) + 1];     // add to customer_helper -> 1 -> 25 pins
        I.scrollTo(this.locators.pinsID(filterPins));
        I.click(this.locators.pinsID(filterPins));
        this.verifyElementsPinWindow()
    },

    /**
     * Save a pin to a random board
     */
    savePinToBoard: async function () {
        await this.clickRandomPin();
        I.click(this.locators.dataID('boardSelectionDropdown'));
        await createBoard.numberOfBoardsListViaUI();
    },

    /**
     * Save a pin to a new board
     */
    savePinToNewBoard: async function () {
        await this.clickRandomPin();
        I.click(this.locators.dataID('boardSelectionDropdown'));
        createBoard.createNewBoardFromPin();
    },
};