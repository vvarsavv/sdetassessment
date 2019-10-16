'use strict';

const {I, pinsNavigation, boardsNavigation, commonLocators, createNewBoard, boardsApiCalls} = inject();

module.exports = {

    //aria-labels-locators
    addPinsEmptyBoard: '~add Pins to empty board modal',

    // oneTapNavigateLink
    /**
     * Clicks on a random pin from the homepage
     */
    clickRandomPinFromUI: async function (numberOfPins) {
        const pins = await I.grabAttributeFrom('$pin', 'data-test-pin-id');
        const pinsRandomiser = await I.randomiser(numberOfPins, 1);
        const seperator = await I.seperator(pins);
        const filterPins = await seperator[pinsRandomiser];

        I.say(`Pin ID clicked: ${filterPins}`);
        I.scrollTo(commonLocators.dataTestPinID(filterPins));
        I.click(commonLocators.dataTestPinID(filterPins));
    },

    /**
     * Add a number of pins to a board
     * @param {number} amountOfPinsToAddToBoard
     */
    addNumberOfPinsFromUI: async function (amountOfPinsToAddToBoard) {
        pinsNavigation.verifyPinsMainPage();
        const pinsToAdd = amountOfPinsToAddToBoard;
        let start = 0;

        while (start < pinsToAdd) {
            start++;
            await this.clickRandomPinFromUI(3);
            I.click('$boardSelectionDropdown');
            await boardsNavigation.numberOfBoardsListFromUI();
            pinsNavigation.closePinWindow();
        }
    },

    /**
     * Save a pin to a new board
     */
    savePinToNewBoardFromUI: async function (boardName) {
        await this.clickRandomPinFromUI(1);
        I.click('$boardSelectionDropdown');
        createNewBoard.createNewBoardFromPinFromUI(boardName);
    },

    moveAndSavePinToBoardFromUI: async function () {
        await boardsNavigation.clickOnRandomBoardFromUserProfile(1);
        await this.clickRandomPinFromUI(1);
        pinsNavigation.editThisPin();
        I.click('[aria-label="Edit your previously saved Pin"] [role="button"]:first-child');
    }
};