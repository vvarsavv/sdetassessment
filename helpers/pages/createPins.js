'use strict';

const {I, createBoards} = inject();

module.exports = {

    locators: {
        pinClass: '[class*="PinRep"]',
        dataID: (name) => `[data-test-id="${name}"]`,
        pinsID: (id) => `[data-test-pin-id="${id}"]`,
        chooseBoard: '[aria-label="Choose board"]' // add locator to custom_helper -> aria-label is common in create boards
    },

    /**
     *
     */
    verifyElementsPinWindow() {
        I.waitForVisible(this.locators.dataID('SaveButton'));
        I.seeElement(this.locators.dataID('gradient'));
        I.seeElement(this.locators.dataID('SaveButton'));
    },

    /**
     * Clicks a random pin from the homepage
     */
    clickRandomPin: async function() {
        I.waitForVisible(this.locators.dataID('pin'));
        let pins = await I.grabAttributeFrom(this.locators.dataID('pin'), 'data-test-pin-id');
        let filterPins = pins.toString().split(',')[Math.floor(Math.random() * 10) + 1];     // add to customer_helper
        I.click(this.locators.pinsID(filterPins));
        this.verifyElementsPinWindow()
    },

    savePinToBoard: async function () {
        await this.clickRandomPin();
        I.click(this.locators.dataID('SaveButton'));
        I.waitForElement(this.locators.chooseBoard);
        I.click(this.locators.chooseBoard);
    },
};