// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Collectible.sol";

// https://anallergytoanalogy.medium.com/jumping-into-solidity-the-erc721-standard-part-1-e25b67fc91f3
// https://brunch.co.kr/@curg/20
// https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/1.-how-to-develop-an-nft-smart-contract-erc721-with-alchemy

contract CollectibleGenerator {
    event Generate();

    function generate(string memory name, string memory symbol) public returns (address) {
        Collectible collectible = new Collectible(name, symbol);

        emit Generate();
        return address(collectible);
    }
}
