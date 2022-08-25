// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Collectible.sol";
import "../access/RBACable.sol";
import "./CollectibleStorage.sol";

// https://anallergytoanalogy.medium.com/jumping-into-solidity-the-erc721-standard-part-1-e25b67fc91f3
// https://brunch.co.kr/@curg/20
// https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/1.-how-to-develop-an-nft-smart-contract-erc721-with-alchemy

contract CollectibleGenerator is RBACable {
    CollectibleStorage _collectibleStorage;

    event Generate(string name, string symbol);

    constructor(RBAC _rbac, CollectibleStorage collectibleStorage) RBACable(_rbac) {
        _collectibleStorage = collectibleStorage;
    }

    function generate(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) public adminOnly returns (address) {
        Collectible collectible = new Collectible(name, symbol, baseTokenURI);

        _collectibleStorage.addCollectible(name, symbol, address(collectible));

        emit Generate(name, symbol);
        return address(collectible);
    }

    function doModeratorOnly() public view moderatorOnly returns (address) {
        return _msgSender();
    }
}
