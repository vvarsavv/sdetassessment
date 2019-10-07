'use strict';

const {I, createBoard} = inject();

module.exports = {

    locators: {
        pinClass: '[class*="PinRep"]',

        dataID: (name) => `[data-test-id="${name}"]`,
        pinsID: (id) => `[data-test-pin-id="${id}"]`,

        chooseBoard: '[aria-label="Choose board"]', // add locator to custom_helper -> aria-label is common in create boards
        closePin: '[aria-label="Go back"]',
        editButton: '[aria-label="Edit"]',
        editWindow: '[aria-label="Edit your previously saved Pin"]',
        deleteWindow: '[aria-label="Are you sure you want to delete this Pin?"]'
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
     * @param numberOfPins = number
     * numberOfPins = is number of possible results
     */
    clickRandomPinFromUI: async function(numberOfPins) {
        I.waitForVisible(this.locators.dataID('pin'), 10);
        let pins = await I.grabAttributeFrom(this.locators.dataID('pin'), 'data-test-pin-id');
        let filterPins = pins.toString().split(',')[Math.floor(Math.random() * numberOfPins) + 1];     // add to customer_helper -> 1 -> 16 pins
        I.scrollTo(this.locators.pinsID(filterPins));
        I.click(this.locators.pinsID(filterPins));
        this.verifyElementsPinWindow();
    },

    /**
     * Save a pin to a random board
     */
    savePinToBoardFromUI: async function () {
        await this.clickRandomPinFromUI(15);
        I.click(this.locators.dataID('boardSelectionDropdown'));
        await createBoard.numberOfBoardsListFromUI();
    },

    /**
     * Save a pin to a new board
     */
    savePinToNewBoardFromUI: async function () {
        await this.clickRandomPinFromUI(15);
        I.click(this.locators.dataID('boardSelectionDropdown'));
        createBoard.createNewBoardFromPinFromUI();
    },

    closePinWindow() {
        let closeElement = I.grabNumberOfVisibleElements(this.locators.closePin);
        closeElement = 1 ? I.say('No close button located') : I.click(this.locators.closePin);
    },

    /**
     * edit a pin from "Edit this pin" window
     */
    editThisPin(){
        I.click(this.locators.editButton);
        I.waitForElement(this.locators.editWindow);
    },

    /**
     * delete a pin from a board
     */
    deleteRandomPinInBoardFromUI: async  function() {
        await createBoard.clickOnRandomBoardFromUI(3);
        await this.clickRandomPinFromUI(1);
        this.editThisPin();
        I.click(this.locators.dataID('delete-pin-button'));
        I.waitForElement(this.locators.deleteWindow);
        I.click(this.locators.dataID('confirm-delete-pin'));
    },
};