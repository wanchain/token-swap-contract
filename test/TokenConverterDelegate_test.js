const TokenSwapDelegate = artifacts.require("TokenSwapDelegate");
const TokenSwapProxy = artifacts.require("TokenSwapProxy");
const TestToken = artifacts.require("TestToken");
const assert = require('assert');
const Web3 = require('web3');



contract("TokenSwapDelegate", accounts => {
  it("all", async ()=>{
    const tokenSwapDelegate1 = await TokenSwapDelegate.new();
    const tokenSwapProxy = await TokenSwapProxy.new(tokenSwapDelegate1.address, accounts[1], "0x");


    const tokenSwapDelegate2 = await TokenSwapDelegate.new();

    await tokenSwapProxy.upgradeTo(tokenSwapDelegate2.address, {from: accounts[1]});

    await tokenSwapProxy.changeAdmin(accounts[2], {from: accounts[1]});

    const tokenSwapDelegate3 = await TokenSwapDelegate.new();

    await tokenSwapProxy.upgradeTo(tokenSwapDelegate3.address, {from: accounts[2]});

    let tokenSwapDelegate = await TokenSwapDelegate.at(tokenSwapProxy.address);

    
    
    const token0 = await TestToken.new();
    const token1 = await TestToken.new();
    console.log('address:', token0.address, token1.address, tokenSwapDelegate.address);

    await tokenSwapDelegate.initialize(accounts[0], token0.address, token1.address);

    //Use delegate for test----------------

    await token0.mint(accounts[1], 100000000);
    await token1.mint(accounts[2], 100000000);
    console.log('balance:', await token0.balanceOf(accounts[1]), await token0.balanceOf(accounts[2]), await token0.balanceOf(tokenSwapDelegate.address));

    await token1.transfer(tokenSwapDelegate.address, 100000000, {from: accounts[2]});

    console.log('balance:', await token0.balanceOf(accounts[1]), await token0.balanceOf(accounts[2]), await token0.balanceOf(tokenSwapDelegate.address));

    await token0.approve(tokenSwapDelegate.address, "0xf000000000000000000000000000000", {from: accounts[1]});

    console.log('allownce:', (await token0.allowance(accounts[1], tokenSwapDelegate.address)).toString());

    await tokenSwapDelegate.swap(token0.address, 10000000, {from: accounts[1]});

    console.log('balance:', await token0.balanceOf(accounts[1]), await token0.balanceOf(accounts[2]), await token0.balanceOf(tokenSwapDelegate.address));

    await tokenSwapDelegate.swap(token0.address, 90000000, {from: accounts[1]});

    console.log('balance:', await token0.balanceOf(accounts[1]), await token0.balanceOf(accounts[2]), await token0.balanceOf(tokenSwapDelegate.address));

    try {

      await tokenSwapDelegate.swap(token0.address, 90000000, {from: accounts[1]});

      assert(false, 'Should never get here');
    } catch (error) {
      
    }

  });
});