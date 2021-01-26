const TokenSwapProxy = artifacts.require("TokenSwapProxy");
const TokenSwapDelegate = artifacts.require("TokenSwapDelegate");

module.exports = async function (deployer) {
  await deployer.deploy(TokenSwapDelegate);
  await deployer.deploy(TokenSwapProxy, (await TokenSwapDelegate.deployed()).address, '0x4cf0a877e906dead748a41ae7da8c220e4247d9e', '0x');

};

