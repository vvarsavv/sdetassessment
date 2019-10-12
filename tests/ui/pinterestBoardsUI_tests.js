Feature('Pinterest Boards tests');

BeforeSuite(async function (I, domains, login) {
    I.say(`Running UI testing suite on: ${domains.PINTEREST_URL.domain}`);
    await login('myUsername');
});

Scenario('Boards tests: Add new boards', async function  (I, boardsNavigation, createNewBoard) {
    boardsNavigation.clickOnProfileFromUI();
    await createNewBoard.addNumberOfBoardsFromUI();
}).tag('@boards-ui-tests');

//negative test

Scenario('Boards tests: Enter invalid characters as board name', async function  (I, boardsNavigation, createNewBoard) {
    boardsNavigation.clickOnProfileFromUI();
    await createNewBoard.invalidBoardNameDetails();
    //AZUd_nuE2Wgnj2xazqemXl-sBXni-XQmwgJkY0kYf523G43MsnUYI7RqpnISOQyBOMJjkeihyEA0mGkz94m3wIs todo pins with promoted (not:underlineLink)
}).tag('@boards-ui-tests');

