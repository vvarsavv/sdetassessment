'use strict';
const HttpStatus = require('http-status-codes');
const {I, apiData, createPins, userData} = inject();

module.exports = {

    locators: {
        createBoard: '[title*="Create board"]',
        saveButton: '[data-test-id*="SaveButton"]',
        boardsTitle: '[data-test-id*="Section"] [title]',
        userProfileBoards: '[class*="UserProfileContent"] [data-test-id]',
        boardTitle: (title) => `[title="${title}"]`,

        textLocator: (text) => `//*[contains(text(), "${text}")]`,

    },

    /**
     * clicks on profile icon in main-page
     */
    clickOnProfileFromUI() {
        I.click('~Saved');
    },


    /**
     * Asserts that a boards exists via UI
     * @param boardName = string
     */
    assertBoardExistsFromUI(boardName) {
        I.see(boardName)
    },

    /**
     *
     * @param listOfUserBoards
     */
    grabNumberOfBoardsFromUI: async function (listOfUserBoards) {
        const boardsRandomiser = await I.randomiser(3,1);
        const seperator = await I.seperator(listOfUserBoards);
        const filterBoards = await seperator[boardsRandomiser];

        I.click(this.locators.boardTitle(filterBoards));
        I.say(`Board name clicked: ${filterBoards}`);

        return {
            filteredBoard: filterBoards
        }
    },

    /**
     * grab and list the number of boards from selected pin
     */
    numberOfBoardsListFromUI: async function () {
        const listOfUserBoards = await I.grabAttributeFrom(this.locators.boardsTitle, 'title');
        await this.grabNumberOfBoardsFromUI(listOfUserBoards)
    },

    /**
     * clicks on a random board from user's profile
     */
    clickOnRandomBoardFromUserProfile: async function () {
        this.clickOnProfileFromUI();
        I.waitForVisible(this.locators.userProfileBoards);
        const listProfileBoards = await I.grabAttributeFrom(this.locators.userProfileBoards, 'data-test-id');
        const boardsRandomiser = await I.randomiser(3,1);
        const seperator = await I.seperator(listProfileBoards);
        const filterBoards = await seperator[boardsRandomiser];

        I.click(this.locators.boardTitle(filterBoards));
        I.say(`Board name clicked: ${filterBoards}`);
    },
};