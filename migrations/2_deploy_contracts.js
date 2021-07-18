// Imports the Ticketting smart contract
const Ticketting = artifacts.require("Ticketting");

module.exports = (deployer) => {
  // Deploy the Ticektting smart contract to the configured blockchain
  deployer.deploy(Ticketting, 'Test Event 0', 10)
}