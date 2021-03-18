pragma solidity ^0.7.3;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "hardhat/console.sol";

contract TokenV2 is Initializable {
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
    randNonce = 0;
    winThreshold = 50;
  }

  modifier hasEnoughTokens(uint256 _amount) {
    require(balances[msg.sender] >= _amount, "Not enough tokens");
    _;
  } 

  function transfer(address _to, uint256 _amount) external hasEnoughTokens(_amount) {
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
  }

  function balanceOf(address _address) external view returns(uint256) {
    return balances[_address];
  }

  function gamble(uint256 _amount) external hasEnoughTokens(_amount) returns(uint256) {
    randNonce += 1;
    uint randNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % 100;

    console.log('randNumber => ', randNumber);
    if (randNonce >= winThreshold) {
      console.log('win => ');
      balances[msg.sender] += _amount;
    } else {
      console.log('lose => ');
      balances[msg.sender] -= _amount;
    }

    console.log('balances[msg.sender] => ', balances[msg.sender]);
    return balances[msg.sender];
  }
}
