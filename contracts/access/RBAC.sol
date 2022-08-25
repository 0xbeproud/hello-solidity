// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// https://medium.com/hackernoon/role-based-access-control-for-the-ethereum-blockchain-bcc9dfbcfe5c
contract RBAC is AccessControlEnumerable {
    bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
    bytes32 public constant ROLE_MODERATOR = keccak256("ROLE_MODERATOR");
    bytes32 public constant ROLE_MINTER = keccak256("ROLE_MINTER");

    constructor() {
        _grantRole(ROLE_ADMIN, _msgSender());
        _grantRole(ROLE_MODERATOR, _msgSender());
        _grantRole(ROLE_MINTER, _msgSender());
    }

    modifier adminOnly() {
        require(isAdmin(_msgSender()), "Restricted to admin.");
        _;
    }

    modifier moderatorOnly() {
        require(isModerator(_msgSender()), "Restricted to moderator.");
        _;
    }

    modifier minterOnly() {
        require(isMinter(_msgSender()), "Restricted to minter.");
        _;
    }

    function addAdmin(address account) public virtual adminOnly {
        _grantRole(ROLE_ADMIN, account);
        _grantRole(ROLE_MODERATOR, account);
        _grantRole(ROLE_MINTER, account);
    }

    function isAdmin(address account) public view virtual returns (bool) {
        return hasRole(ROLE_ADMIN, account);
    }

    function addModerator(address account) public virtual moderatorOnly {
        _grantRole(ROLE_MODERATOR, account);
        _grantRole(ROLE_MINTER, account);
    }

    function isModerator(address account) public view virtual returns (bool) {
        return hasRole(ROLE_MODERATOR, account);
    }

    function addMinter(address account) public virtual minterOnly {
        _grantRole(ROLE_MINTER, account);
    }

    function isMinter(address account) public view virtual returns (bool) {
        return hasRole(ROLE_MINTER, account);
    }
}
