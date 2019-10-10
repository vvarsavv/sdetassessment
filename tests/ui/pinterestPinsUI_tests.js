Feature('Pinterest Pins tests');

BeforeSuite(async function (I, domains, login) {
    I.say('Running UI testing suite on: ' + `${domains.PINTEREST_URL.domain}`);
   await login('user');
});

Scenario('Pins tests: save a number of pins to a board', async function  (I, createPins) {
    await createPins.addNumberOfPinsFromUI(2);
}).tag('@pins-ui-tests');

Scenario('Pins tests: save a pin to a new board', async function  (I, createPins) {
    const boardName = await I.createTitleForForm();
    await createPins.savePinToNewBoardFromUI(boardName.titleName);
}).tag('@pins-ui-tests');

Scenario.only('Pins tests: delete a random pin from a board', async function  (I, createPins) {
    await createPins.deleteRandomPinInBoardFromUI();
}).tag('@pins-ui-tests');

Scenario('Pins tests: create a new pin and add it to a random board', async function  (I, createPins) {
    await createPins.createNewPinFromUI();
}).tag('@pins-ui-tests');

// Scenario.only('Pins tests: create a new pin and add it to a random board', async function  (I, createPins) {
//     await createPins.createNewPinFromUI();
// }).tag('@pins-ui-tests');


//todo: negative tests
//todo: move pin test

// Scenario('Pins tests: move pins from a board to another board', async function  (I, createPins) {
// }).tag('@pins-ui-tests');

//
// Scenario('Pins tests: create a new pin with hi-res photo', async function  (I, createPins) {
//     await createPins.createNewPinFromUI();
// }).tag('@pins-ui-tests');

// Scenario('Pins tests: move pins from a board to another invalid board', async function  (I, createPins) {
// }).tag('@pins-ui-tests');
//
