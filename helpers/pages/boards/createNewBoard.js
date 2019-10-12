'use strict';

const {I, boardsNavigation, commonLocators, createNewPin} = inject();

module.exports = {

    //new board form
    form: {
        boardName: '[name="boardName"]',
        submit: '[type="submit"]',
    },

    /**
     * Add a number of boards
     */
    addNumberOfBoardsFromUI: async function () {
        const boardsToAdd = 4;
        let start = 0;

        while (start < boardsToAdd) {
            start++;
            const boardName =  await I.createTitleForForm();
            await this.addBoardFromMainPageFromUI(boardName.titleName);
            I.click(commonLocators.closePopup);
            boardsNavigation.assertBoardExistsFromUI(boardName.titleName);
            boardsNavigation.clickOnProfileFromUI();
        }
    },

    /**
     * add a board from the main page
     *
     */
    addBoardFromMainPageFromUI: async function (boardName) {
        I.waitForVisible(commonLocators.profileActions);
        I.click(commonLocators.profileActions);
        I.click(boardsNavigation.locators.createBoard);
        I.fillField(this.form.boardName, boardName);
        I.click(this.form.submit);

        //todo: assertion of board creation
    },

    /**
     * enter invalid characters as board name
     */
    invalidBoardNameDetails: async function () {
        const invalidDetails = await I.createTitleForForm();
        await this.addBoardFromMainPageFromUI(invalidDetails.invalidCharacters);
        I.see('Invalid parameters. You are required to have at least one letter or number in a board name');

        // I.see('Please enter no more than 180 characters.')
    },

    /**
     * create a new board from selected pin
     */
    createNewBoardFromPinFromUI(boardName) {
        I.waitForElement(commonLocators.dataTestID('create-board'));
        I.click(commonLocators.dataTestID('create-board'));
        I.fillField(this.form.boardName, boardName);
        I.click(this.form.submit);

        boardsNavigation.assertBoardExistsFromUI(boardName);
        //todo: assert board title creation
    },

    // createBoardViaAPIorUI: async function() {
    //     const userBoardViaApi = await this.createUserBoardViaAPI();
    //
    //     if (userBoardViaApi.postStatus === HttpStatus.TOO_MANY_REQUESTS)
    //     {
    //         await this.addBoardFromMainPageFromUI();
    //     }
};
