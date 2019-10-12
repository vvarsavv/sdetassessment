'use strict';

const {I, pinsNavigation, boardsNavigation, commonLocators} = inject();

module.exports = {

    //aria-labels-locators
    addPinsEmptyBoard: '~add Pins to empty board modal',

    /**
     * Clicks on a random pin from the homepage
     */
    clickRandomPinFromUI: async function () {
        const pins = await I.grabAttributeFrom(commonLocators.dataTestID('pin'), 'data-test-pin-id');
        const pinsRandomiser = await I.randomiser(10, 1);
        const seperator = await I.seperator(pins);
        const filterPins = await seperator[pinsRandomiser];

        I.say(`Pin ID clicked: ${filterPins}`);
        I.scrollTo(commonLocators.dataTestPinID(filterPins));
        I.click(commonLocators.dataTestPinID(filterPins));
    },

    /**
     * Add a number of pins to a board
     * @param {number} amountOfPinsToAdd
     */
    addNumberOfPinsFromUI: async function (amountOfPinsToAdd) {
        pinsNavigation.verifyPinsMainPage();
        const pinsToAdd = amountOfPinsToAdd;
        let start = 0;

        while (start < pinsToAdd) {
            start++;
            await this.clickRandomPinFromUI();
            I.click(commonLocators.dataTestID('boardSelectionDropdown'));
            await boardsNavigation.numberOfBoardsListFromUI();
            pinsNavigation.closePinWindow();
        }
    },

    /**
     * Save a pin to a random board
     */
    savePinsToNewBoardFromUI: async function () {
        I.waitForEnabled(this.addPinsEmptyBoard);
        I.seeElement(this.addPinsEmptyBoard);
        await this.clickRandomPinFromUI();
    },

    /**
     * Save a pin to a new board
     */
    savePinToNewBoardFromUI: async function (boardName) {
        await this.clickRandomPinFromUI();
        I.click(commonLocators.dataID('boardSelectionDropdown'));
        boardsNavigation.createNewBoardFromPinFromUI(boardName); //todo board is created
    },
};