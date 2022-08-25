// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./CollectibleStorageType.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../access/RBACable.sol";

contract CollectibleStorage is RBACable {
    using Counters for Counters.Counter;
    using CollectibleStorageType for CollectibleStorageType.CollectibleType;

    mapping(uint256 => CollectibleStorageType.CollectibleType) public collectibles;
    Counters.Counter private _ids;

    constructor(RBAC _rbac) RBACable(_rbac) {}

    function addCollectible(
        string memory name,
        string memory symbol,
        address contractAddress
    ) external {
        CollectibleStorageType.CollectibleType storage c = collectibles[_ids.current()];
        c.name = name;
        c.symbol = symbol;
        c.contractAddress = contractAddress;

        _ids.increment();
    }
}
