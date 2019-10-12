const {domains, userData} = inject();

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    loginUser: async function () {

      this.amOnPage(domains.PINTEREST_URL.domain);
      this.click({react: 'Button', props: {title: 'Log in'}});
      this.fillField({id: 'email'}, userData.USER.MYUSERNAME.username);
      this.fillField({id: 'password'}, userData.USER.MYUSERNAME.password);
      this.click({react: 'Button', props: {title: 'Log in'}});
      this.say(`User ${userData.USER.MYUSERNAME.username} is logged in`);
      this.waitForInvisible('~Loading');
      this.waitForEnabled('~Saved', 10);

    },
  });
};
