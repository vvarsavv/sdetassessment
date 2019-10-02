'use strict';

const {I} = inject();

module.exports = {

    fields: {
        loginForm: (form) => `[id*="${form}"]`,
    },
    button: {
        login: '[data-test-id="login-button"] [type="button"]',
        submit: '[data-test-id="registerFormSubmitButton"] [type="submit"]'
    },

    sendLoginForm(username, password) {
        I.wait(5);
        I.click(this.button.login);
        I.fillField(this.fields.loginForm('email'), username);
        I.fillField(this.fields.loginForm('password'), password);
        I.click(this.button.submit);
        I.wait(5);
    },
}