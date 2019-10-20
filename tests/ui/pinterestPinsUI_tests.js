Feature('Pinterest Pins tests');

BeforeSuite(async function (I, domains, login) {
    I.say(`Running UI testing suite on: ${domains.PINTEREST_URL.domain}`);
    await login('myUsername');
});

Scenario('Pins tests: save a number of pins to a random board', async function  (I, savePins) {
    await savePins.addNumberOfPinsFromUI(2);
}).tag('@pins-ui-tests');

Scenario('Pins tests: save a pin to a new board', async function  (I, savePins) {
    const boardName = await I.generateDetailsForForm();
    await savePins.savePinToNewBoardFromUI(boardName.titleName);
}).tag('@pins-ui-tests');

Scenario('Pins tests: create a new pin and add it to a random board', async function  (I, createNewPin) {
    createNewPin.openPinBuilder();
    await createNewPin.enterValidDetails();
}).tag('@pins-ui-tests');

Scenario('Pins tests: verify error messages in add new pin', async function  (I, createNewPin) {
    createNewPin.openPinBuilder();
    await createNewPin.enterInvalidDetails();
}).tag('@pins-ui-tests');

Scenario('Pins tests: move a pin from a board to another board', async function  (I, savePins) {
    await savePins.moveAndSavePinToBoardFromUI();
}).tag('@pins-ui-tests');