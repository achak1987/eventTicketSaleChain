const Ticketting = artifacts.require("Ticketting");

module.exports = (deployer, network, accounts) => {
  const userAddress = accounts[0];
  deployer.deploy(Ticketting, 'Test Event 0', 10)
}