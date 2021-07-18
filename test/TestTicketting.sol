// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

// Imports the Assert class. Used to assert if values are equal. 
import "truffle/Assert.sol";

// Import the DeployedAddresses class. Provides access to the contracts deployed through the migration process
import "truffle/DeployedAddresses.sol";

// Imports our Ticektting smart contract
import "../contracts/Ticketting.sol";

contract TestTicketting {

  // Queries a function from the deployed network
  function testInitialAvailabilityUsingDeployedContract() public {
    Ticketting _event = Ticketting(DeployedAddresses.Ticketting());
    bool expected = true;
    Assert.equal(_event.isAvailable(), expected, "The availability check on deployed contract was unsuccessful");
  }

  // Queries a function by first creating an instance of the smart contract
  function testInitialAvailabilityUsingNewContract() public {
    Ticketting _event = new Ticketting('New Event 1', 5);
    bool expected = true;
    Assert.equal(_event.isAvailable(), expected, "The availability check on a new contract instance was unsuccessful");
  }
}
