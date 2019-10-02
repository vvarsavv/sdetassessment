Feature('Add pins to board test');

BeforeSuite((I, domains) => {
    I.say('Running UI testing suite on: ' + domains.PINTEREST_URL.domain);
});

Before( (I, loginSteps, userData, domains) => {
    I.amOnPage(domains.PINTEREST_URL.domain);
    loginSteps.sendLoginForm(userData.USER.MYUSERNAME.username, userData.USER.MYUSERNAME.password);
});

Scenario('Pinterest grab number of pins test', async function  (I, createPins) {
    await createPins.savePinToBoard();
    pause();
}).tag('@ui');