// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Collectible.sol";

contract CollectibleGenerator {
    function generate(string memory name, string memory symbol) {
        Collectible collectible = new Collectible(name, symbol);
    }
}
