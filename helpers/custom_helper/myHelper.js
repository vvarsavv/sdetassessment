const Helper = codeceptjs.helper;
const casual = require('casual');
const coolImages = require('cool-images');
const expect = require('chai').expect;

const {I} = inject();

class MyHelper extends Helper {

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

    /**
     *
     * @param pins
     */
    async seperator(pins) {
        return pins.toString().split(',');
    };

    /**
     *
     * @param max
     * @param min
     */
    async randomiser(max, min) {
        return Math.floor(Math.random() * max) + min;
    };

    /**
     * Title creator for board, section and pin names
     * @returns {{sectionTitle: *}}
     */
    createTitleForForm() {
        const title = casual.title;
        const invalidCharacters = casual.random_value({invalid1: '$$$$$', invalid2: '%%%%%', invalid3: '@@@@@'});
        const invalidNewTitle = casual.words(50);
        const description = casual.description;
        const invalidDescription = casual.words(100);
        return {
            titleName: title,
            invalidCharacters: invalidCharacters,
            invalidNewTitle: invalidNewTitle,
            description: description,
            invalidDescription: invalidDescription,
        }
    };

     /**
     *
     * @returns {{note: *, image_url: *, name: *, description: *, title: *}}
     */
    parameterDetails() {
        const name =  this.replaceSpaceEncodedForm(casual.title);
        const title =  this.replaceSpaceEncodedForm(casual.title);
        const description =  this.replaceSpaceEncodedForm(casual.words(5));
        const note = this.replaceSpaceEncodedForm(casual.sentence);
        const imgURL = coolImages.one(600,800);
         return {
             name: name,
             title: title,
             description: description,
             note: note,
             image_url: imgURL
        }
    };

    /**
     * Replaces all spaces(‘ ‘) with URL-encoded form (%20)
     * @param text = string
     */
    replaceSpaceEncodedForm(text) {
        return text.replace(/ /g, '%20');
    };

    /**
     * Fail a test with reason
     * @param reason = string
     */
    failTest(reason) {
        expect.fail('Test Failed due to: '+ reason);
    };
}

module.exports = MyHelper;
