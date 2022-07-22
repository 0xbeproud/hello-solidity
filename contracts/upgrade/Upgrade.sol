// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Upgrade is Initializable {
    string private greeting;
    string public name;
    uint256 public dec;
    uint256 public inc;

    struct Item {
        uint256 id;
        string name;
        bool isActive;
    }

    function initialize(string memory _greeting) public initializer {
        __Ownable_init();

        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function decrement(uint256 x) public returns (uint256) {
        return dec = x - 1;
    }

    function increment(uint256 x) public returns (uint256) {
        return inc = x + 1;
    }
}
