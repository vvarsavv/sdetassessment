Feature('Pinterest Boards tests');

BeforeSuite(async function (I, domains, login) {
    I.say(`Running UI testing suite on: ${domains.PINTEREST_URL.domain}`);
    await login('myUsername');
});

Before(async function (login, boardsNavigation) {
    boardsNavigation.clickOnProfileFromUI();
});

Scenario('Boards tests: Add new boards', async function  (I, createNewBoard) {
    await createNewBoard.addNumberOfBoardsFromUI(3);
}).tag('@boards-ui-tests');

Scenario('Boards tests: Enter invalid characters as board name', async function  (I, createNewBoard) {
    await createNewBoard.invalidBoardNameDetails();
}).tag('@boards-ui-tests');

Scenario('Boards tests: Edit board details', async function  (I, editBoard) {
    await editBoard.enterValidDetails();
}).tag('@boards-ui-tests');

Scenario('Boards tests: Edit board details with invalid details', async function  (I, editBoard) {
    await editBoard.enterInvalidDetails();
}).tag('@boards-ui-tests');