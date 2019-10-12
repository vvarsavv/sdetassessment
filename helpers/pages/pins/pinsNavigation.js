'use strict';

const {I} = inject();

module.exports = {

    locators: {
        gridCentered: '[class="gridCentered"]',
    },
    /**
     * Verify pins in main-page
     */
    verifyPinsMainPage() {
        I.click('~Home');
        I.waitForEnabled(this.locators.gridCentered, 10);
    },

    /**
     * close pin window
     */
    closePinWindow() {
        let closeElement = I.grabNumberOfVisibleElements('~Go back');
        closeElement > 1 ? I.say('No close button located') : I.click('~Go back');
    },

    /**
     * edit a pin from "Edit this pin" window
     */
    editThisPin() {
        I.click('~Edit');
        I.waitForElement('~Edit your previously saved Pin');
    },
};