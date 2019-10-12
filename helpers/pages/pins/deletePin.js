'use strict';

const {I, createBoard, savePins, pinsNavigation} = inject();

module.exports = {

    confirmDeletePin: '~Are you sure you want to delete this Pin?',

    /**
     * delete a pin from a board
     */
    deleteRandomPinInBoardFromUI: async function () {
        await createBoard.clickOnRandomBoardFromUserProfile();
        pinsNavigation.verifyPinsMainPage();
        await savePins.clickRandomPinFromUI();
        pinsNavigation.editThisPin();
        I.click(this.locators.dataID('delete-pin-button'));
        I.see(this.confirmDeletePin);
        I.click(this.locators.dataID('confirm-delete-pin'));
    },
};