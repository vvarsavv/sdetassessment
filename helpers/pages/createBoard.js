'use strict';
const casual = require('casual'), HttpStatus = require('http-status-codes'), coolImages = require('cool-images');
const {I, apiData, userData} = inject();

module.exports = {

    locators: {
        plusIcon: '[aria-label*="Profile"]', // add locator to custom_helper -> aria-label is common in create pins
        profileIcon: '[aria-label*="Saved"]',
        createBoard: '[title*="Create board"]',
        createBoardWindow: '[aria-label="Create"]', // add locator to custom_helper -> aria-label is common in create pins
        dataID: (name) => `[data-test-id="${name}"]`,

        boardsTitle: '[data-test-id="boardWithoutSection"] [title]',
        boardsList: (list) => `[data-test-id="boardWithoutSection"] [title="${list}"]`,

        userProfileBoards: '[class="UserProfileContent"] [data-test-id]',
        profileBoardsList: (testId) => `[class="UserProfileContent"] [data-test-id="${testId}"]`,

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

        postRequest.status === HttpStatus.CREATED ? I.say('New user board created: ' + `${retrieveDataFromPostRequest.name}`) : I.failTest(retrieveDataFromPostRequest.message);

        //  Name should be less than 180 characters
        //  Invalid board name.
    },

    /**
     * deletes a board via the api call
     */
    deleteUserBoardViaAPI: async function(boardNameToDelete) {
        const deleteUserBoardApiURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.BOARDS}${userData.USER.MYUSERNAME.profileURL}${boardNameToDelete}?access_token=${apiData.TOKEN}`;
        const deleteRequest = await I.sendDeleteRequest(deleteUserBoardApiURL);

        deleteRequest.status === HttpStatus.GONE ? I.say('User board deleted: ' + `${boardNameToDelete}`) : I.failTest();

    },

    /**
     * gets a list of the user's boards via api call
     */
    getUserBoardListViaAPI: async function () {
        const userBoardURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.ME}${apiData.CALLS.BOARDS}?access_token=${apiData.TOKEN}`;
        //insert check that api is active

        const getUserBoardsResponse = await I.sendGetRequest(userBoardURL);
        const retrieveUserBoardsData = JSON.stringify(getUserBoardsResponse.data);

        I.say(retrieveUserBoardsData);
    },

    /**
     * clicks on profile icon in main-page
     */
    clickOnProfileFromUI() {
        I.click(this.locators.profileIcon);
    },

    /**
     * add a board from the main page
     */
    addBoardFromMainPageFromUI() {
        I.waitForVisible(this.locators.plusIcon);
        I.click(this.locators.plusIcon);
        I.click(this.locators.createBoard);
        this.createNewBoardFromPinFromUI();
    },

    /**
     * create a new board from selected pin
     */
    createNewBoardFromPinFromUI() {
        I.waitForElement(this.locators.dataID('create-board'));
        I.click(this.locators.dataID('create-board'));
        I.fillField(this.form.boardName, casual.title);
        I.click(this.form.submit);
    },

    /**
     * grab and list the number of boards from selected pin
     */
    numberOfBoardsListFromUI: async function () {
        let listOfBoards = await I.grabAttributeFrom(this.locators.boardsTitle, 'title');
        let filterBoards = listOfBoards.toString().split(',')[Math.floor(Math.random() * 3) + 1];     // add to customer_helper
        I.click(this.locators.boardsList(filterBoards));
        I.say('Board name clicked: '`${filterBoards}`);
    },

    /**
     * clicks on a random board from the main-page
     * @param numberOfBoards = number
     * numberOfBoards = is number of possible results
     */
    clickOnRandomBoardFromUI: async function (numberOfBoards) {
        this.clickOnProfileFromUI();
        let listProfileBoards = await I.grabAttributeFrom(this.locators.userProfileBoards, 'data-test-id');
        let filterBoards = listProfileBoards.toString().split(',')[Math.floor(Math.random() * numberOfBoards) + 1];     // add to customer_helper
        I.click(this.locators.profileBoardsList(filterBoards));
    }
};
