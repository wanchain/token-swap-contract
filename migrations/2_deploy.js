const TokenSwapProxy = artifacts.require("TokenSwapProxy");
const TokenSwapDelegate = artifacts.require("TokenSwapDelegate");

module.exports = async function (deployer) {
  const token0 = '0xF74B20b2d2f46DEa5D4b36D22f1e65e115e78087';
  const token1 = '0x6F4A2362fD36F60b1574d353Ee653019FB1079f7';
  const proxyAdmin = '0x5560af0f46d00fcea88627a9df7a4798b1b10961';
  const delegateAdmin = '0x4Cf0A877E906DEaD748A41aE7DA8c220E4247D9e';


  await deployer.deploy(TokenSwapDelegate);
  let delegate = await TokenSwapDelegate.deployed();
  await deployer.deploy(TokenSwapProxy, delegate.address, proxyAdmin, '0x');
  let proxy = await TokenSwapProxy.deployed();

  let tokenSwap = await TokenSwapDelegate.at(proxy.address);
  await tokenSwap.initialize(delegateAdmin, token0, token1);
};

