'use strict';
const casual = require('casual'), HttpStatus = require('http-status-codes'), coolImages = require('cool-images');
const {I, apiData, userData} = inject();

module.exports = {

    locators: {
        plusIcon: '[aria-label*="Profile"]', // add locator to custom_helper -> aria-label is common in create pins
        profileIcon: '[aria-label*="Saved"]',
        createBoard: '[title*="Create board"]',
        saveButton: '[data-test-id*="SaveButton"]',
        createBoardWindow: '[aria-label="Create"]', // add locator to custom_helper -> aria-label is common in create pins
        dataID: (name) => `[data-test-id*="${name}"]`,

        boardsTitle: '[data-test-id*="Section"] [title]',
        boardsList: (list) => `[data-test-id*="Section"] [title="${list}"]`,

        userProfileBoards: '[class="UserProfileContent"] [data-test-id]',
        profileBoardsList: (testId) => `[class="UserProfileContent"] [data-test-id="${testId}"]`,
        loaders: '[aria-label*="Loading"]',
        textLocator: (text) => `//*[contains(text(), "${text}")]`,
        boardTitle: (title) => `[title="${title}"]`
        //Loading home feed
        //Loading
        //[data-test-id*="Section"]

    },

    form: {
        boardName: '[name="boardName"]',
        submit: '[type="submit"]',
    },

    /**
     * Create a board via 'boards' api call
     */
    createUserBoardViaAPI: async function() {
        const parameterDetails = await I.parameterDetails();
        const createUserBoardApiURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.BOARDS}?access_token=${apiData.TOKEN}&name=${parameterDetails.name}&description=${parameterDetails.description}`;

        const postRequest = await I.sendPostRequest(createUserBoardApiURL);
        const retrieveDataFromPostRequest = {
            message: eval(JSON.stringify(postRequest.data.message)),
            name: eval(JSON.stringify(postRequest.data.name))
        };

        postRequest.status === HttpStatus.CREATED ? I.say('New user board created: ' + `${retrieveDataFromPostRequest.name}`) : I.say(retrieveDataFromPostRequest.message);

        return {
            postStatus: postRequest.status
        }
        //  Name should be less than 180 characters
        //  Invalid board name.
    },

    /**
     * Deletes a board via the api call
     */
    deleteUserBoardViaAPI: async function(boardNameToDelete) {
        const deleteUserBoardApiURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.BOARDS}${userData.USER.MYUSERNAME.profileURL}/${boardNameToDelete}/?access_token=${apiData.TOKEN}`;
        const deleteRequest = await I.sendDeleteRequest(deleteUserBoardApiURL);
        deleteRequest.status === HttpStatus.GONE ? I.say('User board deleted: ' + `${boardNameToDelete}`) : I.failTest(`${deleteRequest.status}`);
    },

    /**
     * gets a list of the user's boards via api call
     */
    getUserBoardListViaAPI: async function () {
        const userBoardURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.ME}${apiData.CALLS.BOARDS}?access_token=${apiData.TOKEN}`;
        const getUserBoardsResponse = await I.sendGetRequest(userBoardURL);
        const retrieveUserBoardsData = {
            message: getUserBoardsResponse.data.message,
            url: getUserBoardsResponse.data.data.url,
            name: getUserBoardsResponse.data.data.name
        };
        I.say(retrieveUserBoardsData.url)
        // retrieveUserBoardsData.status === HttpStatus.OK ? I.say(retrieveUserBoardsData.url) : I.failTest(retrieveUserBoardsData.message);
    },

    /**
     * clicks on profile icon in main-page
     */
    clickOnProfileFromUI() {
        I.click(this.locators.profileIcon);
    },

    /**
     * add a board from the main page
     *
     */
    addBoardFromMainPageFromUI(boardName) {
        this.clickOnProfileFromUI();
        I.waitForVisible(this.locators.plusIcon);
        I.click(this.locators.plusIcon);
        I.click(this.locators.createBoard);
        I.fillField(this.form.boardName, `${boardName}`);
        I.click(this.form.submit);

        this.assertBoardExistsFromUI(`${boardName}`);
        //todo: assertion of board creation
    },

    /**
     * Asserts that a boards exists via UI
     * @param boardName = string
     */
    assertBoardExistsFromUI(boardName) {
        this.clickOnProfileFromUI();
        I.see(`${boardName}`)
    },

    /**
     * create a new board from selected pin
     */
    createNewBoardFromPinFromUI(boardName) {
        I.waitForElement(this.locators.dataID('create-board'));
        I.click(this.locators.dataID('create-board'));
        I.fillField(this.form.boardName, `${boardName}`);
        I.click(this.form.submit);
        this.assertBoardExistsFromUI(`${boardName}`);

        //todo: assert board title creation
    },

    /**
     * grab and list the number of boards from selected pin
     */
    numberOfBoardsListFromUI: async function () {
        let listOfBoards = await I.grabAttributeFrom(this.locators.boardsTitle, 'title');
        let filterBoards = listOfBoards.toString().split(',')[Math.floor(Math.random() * 3) + 1];     // add to customer_helper
        I.click(this.locators.boardsList(`${filterBoards}`));
        I.say(`Board name clicked: ${filterBoards}`);

        return {
            filteredBoard: filterBoards
        }
    },

    /**
     * clicks on a random board from the main-page
     * @param numberOfBoards = number
     * numberOfBoards = is number of possible results
     */
    clickOnRandomBoardFromUI: async function () {
        this.clickOnProfileFromUI();
        let listProfileBoards = await I.grabAttributeFrom(this.locators.userProfileBoards, 'data-test-id');
        const boardsRandomiser = await I.randomiser(3,1);
        const seperator = await I.seperator(listProfileBoards);
        const filterBoards = await seperator[boardsRandomiser];

        I.click(this.locators.profileBoardsList(`${filterBoards}`));
    },

    // createBoardViaAPIorUI: async function() {
    //     const userBoardViaApi = await this.createUserBoardViaAPI();
    //
    //     if (userBoardViaApi.postStatus === HttpStatus.TOO_MANY_REQUESTS)
    //     {
    //         await this.addBoardFromMainPageFromUI();
    //     }
};
