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
     * @returns {{note: *, image_url: *, name: *, description: *, title: *}}
     */
    parameterDetails() {
        const name = this.replaceSpaceEncodedForm(casual.title);
        const title = this.replaceSpaceEncodedForm(casual.title);
        const description = this.replaceSpaceEncodedForm(casual.words(5));
        const note = this.replaceSpaceEncodedForm(casual.sentence);
        return {
            name: name,
            title: title,
            description: description,
            note: note,
            image_url: coolImages.one()
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
