pragma solidity ^0.7.3;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

contract Token is Initializable {
  string public name;
  string public symbol;
  uint256 public totalSupply;
  address public owner;

  uint256 randNonce;
  uint256 winThreshold;

  mapping (address => uint256) balances;

  function initialize(string memory _name, string memory _symbol, uint256 _totalSupply) public initializer {
    name = _name;
    symbol = _symbol;
    totalSupply = _totalSupply;
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address _to, uint256 _amount) external {
    require(balances[msg.sender] >= _amount, "Not enough tokens");

    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
  }

  function balanceOf(address _address) external view returns(uint256) {
    return balances[_address];
  }
}
