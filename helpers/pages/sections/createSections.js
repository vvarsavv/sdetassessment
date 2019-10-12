'use strict';
const casual = require('casual');
const {I, boardsNavigation, createPins} = inject();

module.exports = {

    locators: {
        sectionTitleAttributes: '[role="button"] h5[title]',
        sectionTitle: (title) => `h5[title="${title}"]`

        //[aria-label*="board with sections"]
    },

    form: {
        sectionName: '[name="sectionName"]',
        button: '[type="submit"]'
    },

    grabNumberOfSections: async function () {
        const getSectionNames = await I.grabAttributeFrom(this.locators.sectionTitleAttributes, 'title');
        const sectionNamesList = getSectionNames.toString().split(',');
        I.say(`List sections: ${sectionNamesList}`);
        return {
            sectionNames: sectionNamesList
        }
    },


    /**
     *
     */
    createSectionFromUI: async function () {
        const sectionName = await I.parameterDetails();
        await boardsNavigation.clickOnRandomBoardFromUI();
        I.click(this.locators.ariaLabel('Board Actions'));
        I.click(this.locators.dataID('addSection'));
        I.waitForElement(this.locators.ariaLabel('Add a section to the board'));
        I.seeElement(this.form.sectionName);
        I.fillField(this.form.sectionName, `${sectionName.titleName}`);
        I.click(this.form.button);
    },

    //todo: assert section title creation


    selectSectionFromPin() {
        I.click(this.locators.ariaLabel('board with sections'))
    }



};