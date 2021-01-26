const Proxy = artifacts.require("Proxy");
const WaspLotteryDelegate = artifacts.require("WaspLotteryDelegate");

module.exports = async function (deployer) {
  await deployer.deploy(WaspLotteryDelegate);
  // await deployer.deploy(WaspLotteryProxy, (await WaspLotteryDelegate.deployed()).address, '0x4Cf0A877E906DEaD748A41aE7DA8c220E4247D9e', '0x');

};

