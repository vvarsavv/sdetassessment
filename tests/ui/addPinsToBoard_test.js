Feature('Add pins to board test');

BeforeSuite(async function (I, domains, login) {
    I.say('Running UI testing suite on: ' + `${domains.PINTEREST_URL.domain}`);
    await login('user');
});

Before( async function (login, createBoard) {
});

Scenario('Pinterest save a pin to a new board', async function  (I, createPins) {
    await createPins.savePinToNewBoardFromUI();
}).tag('@save-pin-ui');

Scenario('Pinterest save a pin to a random board', async function  (I, createPins) {
    await createPins.savePinToBoardFromUI();
}).tag('@save-pin-ui');

Scenario('Pinterest delete a random pin from a board', async function  (I, createPins) {
    await createPins.deleteRandomPinInBoardFromUI();
}).tag('@save-pin-ui');