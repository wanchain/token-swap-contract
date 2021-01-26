// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract TokenSwapStorageV1 {
    using SafeMath for uint256;

    /**
     * @dev token0 is owanBTC, token1 is wanBTC
     */
    address public token0;

    address public token1;

}

