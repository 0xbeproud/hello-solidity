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

    modifier adminOnly() {
        require(isAdmin(_msgSender()), "Restricted to admin.");
        _;
    }

    modifier moderatorOnly() {
        require(isModerator(_msgSender()), "Restricted to moderator.");
        _;
    }

    function addAdmin(address account) public virtual adminOnly {
        _grantRole(ROLE_ADMIN, account);
        _grantRole(ROLE_MODERATOR, account);
    }

    function addModerator(address account) public virtual moderatorOnly {
        _grantRole(ROLE_MODERATOR, account);
    }

    function isAdmin(address account) public view virtual returns (bool) {
        return hasRole(ROLE_ADMIN, account);
    }

    function isModerator(address account) public view virtual returns (bool) {
        return hasRole(ROLE_MODERATOR, account);
    }
}
