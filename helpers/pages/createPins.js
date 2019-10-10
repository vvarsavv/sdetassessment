'use strict';

const {I, createBoard} = inject();

module.exports = {

    locators: {
        pinClass: '[class*="PinRep"]',

        dataID: (name) => `[data-test-id*="${name}"]`,
        pinsID: (id) => `[data-test-pin-id*="${id}"]`,
        ariaLabel: (label) => `[aria-label="${label}"]`,
        ariaLabeltest: (label) => locate(`[aria-label=${label}]`),
        createPin: '[title*="Create Pin"]',

        gridCentered: '[class="gridCentered"]',
        chooseBoard: '[aria-label="Choose board"]', // add locator to custom_helper -> aria-label is common in create boards
        closePin: '[aria-label="Go back"]',
        editButton: '[aria-label="Edit"]',
        editWindow: '[aria-label="Edit your previously saved Pin"]',
        deleteWindow: '[aria-label="Are you sure you want to delete this Pin?"]',
        pinName: '[itemprop="name"]',
        //saved-info
    },

    forms: {
        pinTitle: '[placeholder*="title"]',
        pinDescription: '[placeholder*="about"]',
        pinWebsite: '[placeholder*="website"]',
        pinImage: '[alt*="Image from"]'
    },

    /**
     * Verify pins in main-page
     */
    verifyPinsMainPage() {
        I.waitForEnabled(this.locators.gridCentered, 10);
    },

    /**
     * Verify elements in Pin window
     */
    verifyElementsPinWindow() {
        I.waitForVisible(this.locators.dataID('gradient'));
        I.seeElement(this.locators.dataID('PinBetterSaveButton'));
    },

    /**
     * Clicks on a random pin from the homepage
     */
    clickRandomPinFromUI: async function() {
        this.verifyPinsMainPage()
        const pins = await I.grabAttributeFrom(this.locators.dataID('pin'), 'data-test-pin-id');
        const pinsRandomiser = await I.randomiser(10,1);
        const seperator = await I.seperator(pins);
        const filterPins = await seperator[pinsRandomiser];

        I.say(`Pin ID clicked: ${filterPins}`);
        I.scrollTo(this.locators.pinsID(filterPins));
        I.click(this.locators.pinsID(filterPins));
    },

    /**
     * Add a number of pins to a board
     * @param amountOfPinsToAdd = number ----- todo
     */
    addNumberOfPinsFromUI: async function(amountOfPinsToAdd) {
        this.verifyPinsMainPage();
        const pinsToAdd = amountOfPinsToAdd;
        let start = 0;

        while(start < pinsToAdd) {
            start++;
            await this.clickRandomPinFromUI();
            I.click(this.locators.dataID('boardSelectionDropdown'));
            await createBoard.numberOfBoardsListFromUI();
            this.closePinWindow();
        }
    },

    /**
     * Save a pin to a random board
     */
    savePinToBoardFromUI: async function () {
        await this.clickRandomPinFromUI();
        I.click(this.locators.dataID('boardSelectionDropdown'));
        await createBoard.numberOfBoardsListFromUI();
    },

    /**
     * Save a pin to a new board
     */
    savePinToNewBoardFromUI: async function (boardName) {
        await this.clickRandomPinFromUI();
        I.click(this.locators.dataID('boardSelectionDropdown'));
        createBoard.createNewBoardFromPinFromUI(boardName); //todo board is created
    },

    /**
     * close pin window
     */
    closePinWindow() {
        let closeElement = I.grabNumberOfVisibleElements(this.locators.closePin);
        closeElement > 1 ? I.say('No close button located') : I.click(this.locators.closePin);
    },

    /**
     * edit a pin from "Edit this pin" window
     */
    editThisPin(){
        I.click(this.locators.editButton);
        I.waitForElement(this.locators.editWindow);
    },

    /**
     * delete a pin from a board
     */
    deleteRandomPinInBoardFromUI: async  function() {
        await createBoard.clickOnRandomBoardFromUI();
        await this.clickRandomPinFromUI();
        this.editThisPin();
        I.click(this.locators.dataID('delete-pin-button'));
        I.waitForElement(this.locators.ariaLabeltest('Are you sure you want to delete this Pin?'));
        I.click(this.locators.dataID('confirm-delete-pin'));
    }, //todo i don't see boardName

    // insertPinIntoBoardSectionUI: async function() {
    //     await this.clickRandomPinFromUI(15);
    // },


    //********************************************************CREATE NEW PIN METHODS********************************************************
    /**
     * navigate to new pin creation window via UI
     */
    enterNewPinWindowFromUI() {
        I.waitForVisible(this.locators.ariaLabel('Saved'), 5);
        I.click(this.locators.ariaLabel('Saved'));
        I.click(this.locators.ariaLabel('Profile actions overflow'));
        I.click(this.locators.createPin);
    },

    /**
     * enter details in new pin
     */
    enterDetailsForNewPin: async function() {
        const pinDetails = await I.createTitleForForm();
        const randomImage = await I.parameterDetails();

        I.fillField(this.forms.pinTitle, `${pinDetails.titleName}`);
        I.fillField(this.forms.pinDescription, `${pinDetails.description}`);
        I.click(this.locators.dataID('save-from-site-button'));
        I.fillField(this.forms.pinWebsite, `${randomImage.image_url}`);
        I.click(this.locators.ariaLabel('Submit'));
        I.waitForVisible(this.forms.pinImage);
        I.click(this.forms.pinImage);
        I.click(this.locators.dataID('add-button'));
        I.click(this.locators.dataID('select-button'));
    },

    /**
     * save details of a new pin
     */
    saveDetailsOfNewPin() {
        I.click(this.locators.dataID('save-button'));
        I.waitForVisible(this.locators.ariaLabel('Your saved Pin.'));
        I.click(this.locators.dataID('seeItNow'));
    },

    /**
     * create a new pin
     */
    createNewPinFromUI: async function() {
        this.enterNewPinWindowFromUI();
        await this.enterDetailsForNewPin();
        await createBoard.numberOfBoardsListFromUI();
        this.saveDetailsOfNewPin();
        this.verifyElementsPinWindow();
    }

    //todo: assert new pin title name
    //todo: assert pin title creation
};