const {domains, userData, pinsNavigation} = inject();

module.exports = function() {
  return actor({

    form: {
      frmEmail: 'email',
      frmPassword: 'password'
    },

    button: {
      btnLogin: '$login-button',
      btnSubmit: '$registerFormSubmitButton'
    },

    label: {
      lblLoader: '~Loading'
    },

    loginUser: async function() {
      this.amOnPage(domains.PINTEREST_URL.domain);
      this.click(this.button.btnLogin);
      this.wait(5);
      this.fillField({id: this.form.frmEmail}, userData.USER.MYUSERNAME.username);
      this.wait(5);
      this.fillField({id: this.form.frmPassword}, userData.USER.MYUSERNAME.password);
      this.wait(5);
      this.click(this.button.btnSubmit);
      this.say(`User ${userData.USER.MYUSERNAME.username} is logged in`);
      this.waitForInvisible(this.label.lblLoader);
      pinsNavigation.verifyElementsInMainPage();
    },
  });
};
