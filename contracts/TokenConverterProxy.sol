// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenConverterProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address admin_, bytes memory _data) 
        public 
        payable 
        TransparentUpgradeableProxy(_logic, admin_, _data) { }
}
