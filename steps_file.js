const {domains, userData, commonLocators} = inject();

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    loginUser: function() {
      this.amOnPage(domains.PINTEREST_URL.domain);
      this.click('$login-button');
      this.fillField({id: 'email'}, userData.USER.MYUSERNAME.username);
      this.fillField({id: 'password'}, userData.USER.MYUSERNAME.password);
      this.click('$registerFormSubmitButton');
      this.say(`User ${userData.USER.MYUSERNAME.username} is logged in`);
      this.waitForInvisible('~Loading');
      this.waitForVisible('~Pins from people you follow', 10);
    },
  });
};
