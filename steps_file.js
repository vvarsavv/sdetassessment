const {domains, userData} = inject();

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    fields: {
      loginForm: (form) => `[id*="${form}"]`,
    },
    button: {
      login: '[data-test-id="login-button"] [type="button"]',
      submit: '[data-test-id="registerFormSubmitButton"] [type="submit"]'
    },

    loginUser: async function () {
      this.amOnPage(domains.PINTEREST_URL.domain);
      this.click(this.button.login);
      this.fillField(this.fields.loginForm('email'), userData.USER.MYUSERNAME.username);
      this.fillField(this.fields.loginForm('password'), userData.USER.MYUSERNAME.password);
      this.click(this.button.submit);
      this.say(`User ${userData.USER.MYUSERNAME.username} is logged in`);
    },
  });
};
