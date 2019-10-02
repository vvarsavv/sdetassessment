const expect = require('chai').expect;
const assert = require('chai').assert;

Feature('API tests');

BeforeSuite((I, domains) => {
    I.say('Running API testing suite on: ' + domains.PINTEREST_URL.domain);
});

Scenario('Get user info', async function(I, apiData, userData) {
    const pinterestURL = `${apiData.PINTEREST_API_URL}${apiData.CALLS.ME.USERINFO}?access_token=${apiData.TOKEN}`;
    let pinterestResponse = await I.sendGetRequest(pinterestURL);

    expect(pinterestResponse.status).to.equal(200);
    assert(pinterestResponse.data.url.first_name).to.equal(userData.USER.MYUSERNAME.firstName);
}).tag('@api');