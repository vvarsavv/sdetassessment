Feature('Pinterest Boards tests');

BeforeSuite(async function (I, domains, login, createBoard) {
    I.say('Running UI testing suite on: ' + `${domains.PINTEREST_URL.domain}`);
    await login('user');
});

Scenario('Boards tests: Add a new board', async function  (I, createBoard) {
    const boardName =  await I.createTitleForForm();
    await createBoard.addBoardFromMainPageFromUI(`${boardName.titleName}`);
}).tag('@boards-ui-tests');

//negative test

Scenario('Boards tests: Enter invalid characters as board name', async function  (I, createBoard) {
    const boardName =  await I.createTitleForForm();
    await createBoard.addBoardFromMainPageFromUI(boardName.titleInvalid);

    //AZUd_nuE2Wgnj2xazqemXl-sBXni-XQmwgJkY0kYf523G43MsnUYI7RqpnISOQyBOMJjkeihyEA0mGkz94m3wIs todo pins with promoted (not:underlineLink)
}).tag('@boards-ui-tests');