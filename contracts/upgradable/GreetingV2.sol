// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract GreetingV2 is Initializable {
    string private greeting;
    string public name;
    uint256 public dec;
    uint256 public inc;

    struct Unused{
        uint256 id;
        string name;
        bool isActive;
    }

    struct Item {
        uint256 id;
        string name;
        bool isActive;
    }

    // diff: 여기 추가시 Inserted `extra`
    //  > New variables should be placed after all existing inherited variables
//    uint256 public extra;

    Item[] public items;
    mapping(string => uint256[]) lookup;

    // diff: 여기 추가 OK.
    uint256 public extra;

    function initialize(string memory _greeting) public initializer {
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

    // diff: 여기 추가 OK. method는 위치 상관 없음.
//    function setExtra(uint256 x) public {
//        extra = x;
//    }

    function increment(uint256 x) public returns (uint256) {
        return inc = x + 1;
    }

    function getDec() public view returns (uint256) {
        return dec;
    }

    // diff: 여기 추가 OK. method는 위치 상관 없음.
    function setExtra(uint256 x) public {
        extra = x;
    }
}
