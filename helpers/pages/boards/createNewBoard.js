'use strict';

const {I, boardsNavigation, savePins, boardsApiCalls} = inject();

module.exports = {

    button: {
        btnCreateBoard: '$create-board',
        btnClose: '~close',
        btnProfileActions: '~Profile actions overflow',
        btnCreatePin: '[class="addPinWrapper"]'
    },

    form: {
        frmBoardName: '[name="boardName"]',
        frmSubmit: '[type="submit"]',
    },

    formVerification: {
        frmInvalidParameter: 'Invalid parameters. You are required to have at least one letter or number in a board name',
        frmEnterNoMore: 'Please enter no more than 180 characters.'
    },

    /**
     * Add a number of boards and pins to new board
     */
    addNumberOfBoardsFromUI: async function (addNumberOfBoards) {
        const boardsToAdd = addNumberOfBoards;
        let start = 0;

        while (start < boardsToAdd) {
            start++;
            const boardName =  await I.generateDetailsForForm();
            await this.addBoardFromMainPageFromUI(boardName.titleName);
            boardsNavigation.assertBoardExistsFromUI(boardName.titleName);
            await savePins.insertPinsInNewBoard();
            I.click(this.button.btnClose);
            boardsNavigation.clickOnProfileFromUI();
        }
    },

    /**
     * add a board from the main page
     *
     */
    addBoardFromMainPageFromUI: async function (boardName) {
        I.waitForVisible(this.button.btnProfileActions);
        I.click(this.button.btnProfileActions);
        I.click(boardsNavigation.button.btnCreateBoard);
        I.fillField(this.form.frmBoardName, boardName);
        I.click(this.form.frmSubmit);
        },

    /**
     * enter invalid characters as board name
     */
    invalidBoardNameDetails: async function () {
        const invalidDetails = await I.generateDetailsForForm();
        await this.addBoardFromMainPageFromUI(invalidDetails.invalidCharacters);
        I.see(this.formVerification.frmInvalidParameter);
        I.clearField(this.form.frmBoardName);
        I.fillField(this.form.frmBoardName, invalidDetails.invalidNewTitle);
        I.see(this.form.frmEnterNoMore);
    },

    /**
     * create a new board from selected pin
     */
    createNewBoardFromPinFromUI(boardName) {
        I.waitForElement(this.button.btnCreateBoard);
        I.click(this.button.btnCreateBoard);
        I.fillField(this.form.frmBoardName, boardName);
        I.click(this.form.frmSubmit);
        boardsNavigation.assertBoardExistsFromUI(boardName);
    },

    createBoardViaAPIorUI: async function() {
        const userBoardViaApi = await boardsApiCalls.createUserBoardViaAPI();

        if (userBoardViaApi.boardsApiCalls === HttpStatus.TOO_MANY_REQUESTS) {
            await this.addBoardFromMainPageFromUI();
        }
    }
};
