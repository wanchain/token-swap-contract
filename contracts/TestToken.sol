pragma solidity 0.6.12;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// TestToken
contract TestToken is ERC20("TestToken", "TTN"), Ownable {
    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner (WanSwapFarm).
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }
}
