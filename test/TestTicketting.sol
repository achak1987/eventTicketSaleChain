// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ticketting.sol";

contract TestTicketting {

  function testInitialAvailabilityUsingDeployedContract() public {
    Ticketting _event = Ticketting(DeployedAddresses.Ticketting());

    bool expected = true;

    Assert.equal(_event.isAvailable(), expected, "The availability check on deployed contract was unsuccessful");
  }

  function testInitialAvailabilityUsingNewContract() public {
    Ticketting _event = new Ticketting('New Event 1', 5);

    for(uint i=0; i < 5; i++) {
        _event.buyTicket();
    }
    
    uint expected = 5;

    Assert.equal(_event.retrieveTicket(), expected, "The availability check on a new instance of the contract was unsuccessful");
  }

}
