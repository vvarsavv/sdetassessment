'use strict';

const {I, pinsNavigation, boardsNavigation, createNewBoard} = inject();

module.exports = {

    locator: {
        lblDataTestPinID: 'data-test-pin-id'
    },
    button: {
        btnPin: '$pin',
        btnBoardsSelectionDropdown: '$boardSelectionDropdown',
        btnBoardsSelectionDropdownEditPin: ' [role="button"]:first-child',
        btnEditYourSavedPin: '[aria-label="Edit your previously saved Pin"]',
        btnSaveThisPin: '$edit-pin-save',
        btnTestPinID: (testPinID) => locate(`[data-test-pin-id*="${testPinID}"]`), // custom locator
        btnSavePinToBoard: '$SaveButton'
    },

    /**
     * Clicks on a random pin from the homepage
     */
    clickRandomPinFromUI: async function () {
        const pins = await I.grabAttributeFrom(this.button.btnPin, 'data-test-pin-id');
        const grabNumberOfPins = await I.grabNumberOfVisibleElements(this.button.btnPin);
        const pinsRandomiser = await I.getRandomNumber(1, grabNumberOfPins);
        const splitSpring = await I.splitString(pins, ',');
        const filterPins = await splitSpring[pinsRandomiser];

        I.say(`Pin ID clicked: ${filterPins}`);
        I.scrollTo(this.button.btnTestPinID(filterPins));
        I.click(this.button.btnTestPinID(filterPins));
        return {pinID: filterPins}
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
            await this.clickRandomPinFromUI();
            I.click(this.button.btnBoardsSelectionDropdown);
            await boardsNavigation.grabNumberOfBoardsFromUI();
            pinsNavigation.closePinWindow();
        }
    },

    /**
     * Save a pin to a new board
     * @param {String} boardName
     */
    savePinToNewBoardFromUI: async function (boardName) {
        await this.clickRandomPinFromUI();
        I.click(this.button.btnBoardsSelectionDropdown);
        createNewBoard.createNewBoardFromPinFromUI(boardName);
    },

    /**
     * move pin from a board to another board
     */
    moveAndSavePinToBoardFromUI: async function () {
        await boardsNavigation.clickOnRandomBoardFromUserProfile();

        const pinsID = await this.clickRandomPinFromUI();
        pinsNavigation.editThisPin();
        I.click(this.button.btnEditYourSavedPin + this.button.btnBoardsSelectionDropdownEditPin);
        const boardNameEditWindow = await boardsNavigation.clickRandomBoardFromEditWindow();

        await pinsNavigation.editPinValidDetails();
        I.click(this.button.btnSaveThisPin);
        await this.assertPinMovedToNewBoard(boardNameEditWindow.filterBoardsNameEditWindow, pinsID.pinID);
    },

    /**
     * check pin moved to new board via Pin ID
     * @param {String} boardName
     * @param {String} pinID
     */
    assertPinMovedToNewBoard: async function (boardName, pinID) {
        boardsNavigation.clickOnProfileFromUI();
        I.click(boardsNavigation.button.btnBoardTitle(boardName));
        I.seeElement(this.button.btnTestPinID(pinID));
        I.say(`Pin ID ${pinID} moved to new board ${boardName}`);
    },

    /**
     * insert a number of pins to a newly created board
     */
    insertPinsInNewBoard: async function() {
        const pinsToAdd = 4;
        let start = 0;

        const pins = await I.grabAttributeFrom(this.button.btnPin, 'data-test-pin-id');
        const grabNumberOfPins = await I.grabNumberOfVisibleElements(this.button.btnPin);
        const splitSpring = await I.splitString(pins, ',');

        while (start < pinsToAdd) {
            start++;
            const pinsRandomiser = await I.getRandomNumber(1, grabNumberOfPins);
            const filterPins = await splitSpring[pinsRandomiser];
            I.say(`Pin ID clicked: ${filterPins}`);
            I.moveCursorTo(this.button.btnTestPinID(filterPins));
            I.waitForVisible(this.button.btnSavePinToBoard);
            I.click(this.button.btnSavePinToBoard);
        }
    }
};