const Helper = codeceptjs.helper;
const casual = require('casual');
const sentencer = require('sentencer');
const coolImages = require('cool-images');
const expect = require('chai').expect;


const {I} = inject();

class MyHelper extends Helper {

     /**
     * Split a string into substrings using the specified separator and return them as an array
     * @param {String} stringToSplit - string to be split
     * @param {String} separator - character for splitting the string, if omitted the entire string will be returned
     * @return {Array}
     */
    async splitString(stringToSplit, separator) {
        return stringToSplit.toString().split(separator);
    };

    /**
     * Generate random number
     * @param {Number} min
     * @param {Number} max
     * @return {Number}
     */
    async getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min - 1)) + min;
    };

    /**
     * Generate random details for forms
     * @return {Object} { titleName, invalidCharacters, invalidNewTitle, description, invalidDescription }
     */
    generateDetailsForForm() {
        const title = sentencer.make("{{ a_noun }}");
        const invalidCharacters = casual.random_value({invalid1: '$$$$$', invalid2: '%%%%%', invalid3: '@@@@@'});
        const invalidNewTitle = casual.words(50);
        const description = casual.description;
        const invalidDescription = casual.words(100);
        const imgURL = coolImages.one(600,800);
        return {
            titleName: title,
            invalidCharacters: invalidCharacters,
            invalidNewTitle: invalidNewTitle,
            description: description,
            invalidDescription: invalidDescription,
            image: imgURL
        }
    };

     /**
     * Generate random details for API calls
     * @return {Object} { name, title, description, note, imgURL }
     */
    generateContentForAPI() {
        const name =  this.replaceSpaceEncodedForm(casual.title);
        const title =  this.replaceSpaceEncodedForm(casual.title);
        const description =  this.replaceSpaceEncodedForm(casual.words(5));
        const note = this.replaceSpaceEncodedForm(casual.sentence);
         return {
             name: name,
             title: title,
             description: description,
             note: note,
        }
    };

    /**
     * Replaces all spaces(‘ ‘) with URL-encoded form (%20)
     * @param {String} text
     */
    replaceSpaceEncodedForm(text) {
        return text.replace(/ /g, '%20');
    };

    /**
     * Fail a test with reason
     * @param {String} reason
     */
    failTest(reason) {
        expect.fail('Test Failed due to: '+ reason);
    };
}

module.exports = MyHelper;