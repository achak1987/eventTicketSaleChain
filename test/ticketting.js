const Ticketting = artifacts.require("Ticketting");

contract('Ticketting', (accounts) => {
  it('should get 0 ticket for the first account', async () => {
    const instance = await Ticketting.deployed();
    const response = await instance.isAvailable.call({from: accounts[0]});
    const expected = true;
    assert.equal(response.valueOf(), expected, "more than 0 tickets was present for the first account");
  });

  it('should buy 1 ticket for the first account', async () => {
    const instance = await Ticketting.deployed();
    await instance.buyTicket({from: accounts[0]});
    
    const response = await instance.retrieveTicket.call({from: accounts[0]});
    const expected = 1;
    assert.equal(response.valueOf(), expected, "more than 1 ticket was available for the first account for the first purchase");
  });

  it('should buy 9 ticket for the second account', async () => {
    const instance = await Ticketting.deployed();
    for(var i=0; i< 9; i++) {
      await instance.buyTicket({from: accounts[1]});
    }    

    const response = await instance.retrieveTicket.call({from: accounts[1]});
    const expected = 9;
    assert.equal(response.valueOf(), expected, "9 tickets wasn't purchased for the second account");
  });

  it('should try to buy 1 more ticket for the first account', async () => {
    const instance = await Ticketting.deployed();
    await instance.buyTicket({from: accounts[0]});

    const response = await instance.retrieveTicket.call({from: accounts[0]});
    const expected = 1;
    assert.equal(response.valueOf(), expected, "should not be possible to purchase tickets for the first account any longer");
  });
});
