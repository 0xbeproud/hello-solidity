// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";

contract Collectible is ERC721, Ownable {
    using Counter for Counter.Index;
    Counter.Index private tokenId;

    constructor(string name, string symbol) public ERC721Full(name, symbol) {}

    function mint(address to) pupblic returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        return newItemId;
    }
}
