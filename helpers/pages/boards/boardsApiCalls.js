'use strict';
const HttpStatus = require('http-status-codes');
const {I, apiData, userData} = inject();

module.exports = {

    /**
     * Create a board via 'boards' api call
     */
    createUserBoardViaAPI: async function() {
        const parameterDetails = await I.generateContentForAPI();
        const createUserBoardApiURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.BOARDS}?access_token=${apiData.TOKEN}&name=${parameterDetails.name}&description=${parameterDetails.description}`;
        const postRequest = await I.sendPostRequest(createUserBoardApiURL);
        const retrieveDataFromPostRequest = {
            name: eval(JSON.stringify(postRequest.data.data.name))
        };

        postRequest.status === HttpStatus.CREATED ? I.say('New user board created: ' + `${retrieveDataFromPostRequest.name}`) : I.say(retrieveDataFromPostRequest.data);
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
            name: getUserBoardsResponse.data.data.name
        };
        retrieveUserBoardsData.status === HttpStatus.OK ? I.say(retrieveUserBoardsData.name) : I.failTest(retrieveUserBoardsData.data);

        return { boardName : retrieveUserBoardsData.name }
    },
};