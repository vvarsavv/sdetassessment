'use strict';
const {I} = inject();

module.exports = {

    button: {
        btnBoardsSelection: '$board-selection', //locators by ID are the best locators as its custom made by the QA and devs (it should never change)
        btnSaved: '~Saved',
        btnBoardTitle: (title) => `[title="${title}"]`,
        btnCreateBoard: '[title*="Create board"]',
        btnBoardsTitle: '[data-test-id*="Section"] [title]',
        btnUserProfileBoards: '[class*="UserProfileContent"] [title]'
    },
    text: {
        txtBoardName: (text) => `//div[text()="${text}"]`,
    },

    /**
     * clicks on profile icon in main-page
     */
    clickOnProfileFromUI() {
        I.click(this.button.btnSaved);
    },

    /**
     * Asserts that a boards exists via UI
     * @param {String} boardName
     */
    assertBoardExistsFromUI(boardName) {
        I.waitForText(boardName);
        I.see(boardName);
    },

    /**
     * grab number of boards from user's profile
     * @return {String} listOfUserBoards
     */
    grabNumberOfBoardsFromUI: async function () {
        const listOfUserBoards = await I.grabAttributeFrom(this.button.btnBoardsTitle,  'title');
        const grabNumberOfBoardNames = await I.grabNumberOfVisibleElements(this.button.btnBoardsTitle);
        const boardsRandomiser = await I.getRandomNumber(1, grabNumberOfBoardNames);
        const splitString = await I.splitString(listOfUserBoards, ',');
        const filterBoards = await splitString[boardsRandomiser];
        I.click(this.button.btnBoardTitle(filterBoards));
        I.say(`Board name clicked: ${filterBoards}`);

        return {filterBoardsName: filterBoards};
    },

    /**
     * clicks on a random board from user's profile
     * @return {String} filterBoardsName
     */
    clickOnRandomBoardFromUserProfile: async function () {
        this.clickOnProfileFromUI();

        const listProfileBoards = await I.grabAttributeFrom(this.button.btnUserProfileBoards, this.locator.lblTitle);
        const boardsRandomiser = await I.getRandomNumber(1, 2);
        const splitString = await I.splitString(listProfileBoards, ',');
        const filterBoards = await splitString[boardsRandomiser];

        I.waitForElement(this.button.btnBoardTitle(filterBoards));
        I.click(this.button.btnBoardTitle(filterBoards));
        I.say(`Board name clicked: ${filterBoards}`);

        return {filterBoardsName: filterBoards}
    },

    /**
     * clicks on a random board in the edit window
     */
    clickRandomBoardFromEditWindow: async function() {
        const grabBoardNames = await I.grabTextFrom(this.button.btnBoardsSelection);
        const boardsRandomiser = await I.getRandomNumber(1, 2);
        const splitString = await I.splitString(grabBoardNames, ',');
        const filterBoards = await splitString[boardsRandomiser];
        I.click(this.text.txtBoardName(filterBoards));

        return {filterBoardsNameEditWindow: filterBoards}
    },
};