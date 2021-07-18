// Imports the Ticketting smart contract class
const Ticketting = artifacts.require("Ticketting");

// We supply the default accounts the contract instance so as to be able to interact with it using a purticular account
contract('Ticketting', (accounts) => {
  // Utilizing the web3 package, we write test cases to be executed on the smart contract
  // Test case 1: Checking that after deployment of the contract no user including account 1 should have any ticekts
  it('should get 0 ticket for the first account', async () => {
    // Create a connection instance with the smart contact
    const instance = await Ticketting.deployed();
    // We execute a getter function on the smart contract
    const response = await instance.isAvailable.call({from: accounts[0]});
    const expected = true;
    // We write an assertion to see if the returned value is equal to what we expect
    assert.equal(response.valueOf(), expected, "more than 0 tickets was present for the first account");
  });
  // Test case 2: Account 1 purchases a ticket.
  it('should buy 1 ticket for the first account', async () => {
    // Create a connection instance with the smart contact
    const instance = await Ticketting.deployed();
    // We execute a setter function on the smart contract to update the state
    await instance.buyTicket({from: accounts[0]});
    
    // We execute a getter function on the smart contract
    const response = await instance.retrieveTicket.call({from: accounts[0]});
    const expected = 1;
    // We write an assertion to see if the returned value is equal to what we expect
    assert.equal(response.valueOf(), expected, "more than 1 ticket was available for the first account for the first purchase");
  });

  // Test case 3: Account 2 purchases 9 tickets.
  it('should buy 9 ticket for the second account', async () => {
    // Create a connection instance with the smart contact
    const instance = await Ticketting.deployed();
    // A for loop that executes a setter function to purchase a ticket for this user 9 times
    for(var i=0; i< 9; i++) {
      await instance.buyTicket({from: accounts[1]});
    }    
    // We execute a getter function on the smart contract
    const response = await instance.retrieveTicket.call({from: accounts[1]});
    const expected = 9;
    // We write an assertion to see if the returned value is equal to what we expect
    assert.equal(response.valueOf(), expected, "9 tickets wasn't purchased for the second account");
  });

  // Test case 4: Account 1 purchases 1 ticket. 
  // However, the maximum avaliable places of 10 were already purchased and therefoer account 1 should not be able to purchase the ticket
  it('should try to buy 1 more ticket for the first account', async () => {
    // Create a connection instance with the smart contact
    const instance = await Ticketting.deployed();
    // We execute a setter function on the smart contract to update the state
    await instance.buyTicket({from: accounts[0]});

    // We execute a getter function on the smart contract. 
    // We will observe that the state was not updated as the smart contract condition on being able to purchase tickets only if tickets are available was not satisfied
    const response = await instance.retrieveTicket.call({from: accounts[0]});
    const expected = 1;
    // We write an assertion to see if the returned value is equal to what we expect
    assert.equal(response.valueOf(), expected, "should not be possible to purchase tickets for the first account any longer");
  });
});
