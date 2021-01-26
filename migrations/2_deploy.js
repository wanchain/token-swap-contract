const TokenSwapProxy = artifacts.require("TokenSwapProxy");
const TokenSwapDelegate = artifacts.require("TokenSwapDelegate");

module.exports = async function (deployer) {
  const token0 = '0xF74B20b2d2f46DEa5D4b36D22f1e65e115e78087';
  const token1 = '0x6F4A2362fD36F60b1574d353Ee653019FB1079f7';
  const admin = '0x4cf0a877e906dead748a41ae7da8c220e4247d9e';

  await deployer.deploy(TokenSwapDelegate);
  let delegate = await TokenSwapDelegate.deployed();
  await deployer.deploy(TokenSwapProxy, delegate.address, admin, '0x');
  let proxy = await TokenSwapProxy.deployed();

  let tokenSwap = await TokenSwapDelegate.at(proxy.address);
  await tokenSwap.initialize(admin, token0, token1);
};

