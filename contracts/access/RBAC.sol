// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// https://medium.com/hackernoon/role-based-access-control-for-the-ethereum-blockchain-bcc9dfbcfe5c
contract RBAC is AccessControlEnumerable {
    bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
    bytes32 public constant ROLE_MODERATOR = keccak256("ROLE_MODERATOR");

    constructor() {
        _grantRole(ROLE_ADMIN, _msgSender());
        _grantRole(ROLE_MODERATOR, _msgSender());
    }

    modifier onlyAdmin() {
        _checkRole(ROLE_ADMIN);
        _;
    }

    modifier onlyModerator() {
        _checkRole(ROLE_ADMIN);
        _checkRole(ROLE_MODERATOR);
        _;
    }

    function addAdmin(address account) public virtual onlyAdmin {
        _grantRole(ROLE_ADMIN, account);
        _grantRole(ROLE_MODERATOR, account);
    }

    function addModerator(address account) public virtual onlyModerator {
        _grantRole(ROLE_MODERATOR, account);
    }
}
