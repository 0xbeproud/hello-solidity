// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Collectible.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// https://anallergytoanalogy.medium.com/jumping-into-solidity-the-erc721-standard-part-1-e25b67fc91f3
// https://brunch.co.kr/@curg/20
// https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/1.-how-to-develop-an-nft-smart-contract-erc721-with-alchemy

contract CollectibleGenerator {
    using Counters for Counters.Counter;
    Counters.Counter public _collectibleIdCounter;

    struct Collectiable {
        uint256 id;
        address to;
    }
    address[] public generated;

    function generate(string memory _name, string memory _symbol) public {
        Collectible collectible = new Collectible(_name, _symbol);
        generated.push(address(collectible));
    }
}
