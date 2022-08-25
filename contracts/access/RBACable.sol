// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./RBAC.sol";
import "@openzeppelin/contracts/utils/Context.sol";

abstract contract RBACable is Context {
    RBAC internal _rbac;

    constructor(RBAC rbac_) {
        _rbac = rbac_;
    }

    modifier adminOnly() {
        require(_rbac.isAdmin(_msgSender()), "admin only allowed");
        _;
    }

    modifier moderatorOnly() {
        require(_rbac.isModerator(_msgSender()), "moderator only allowed");
        _;
    }

    //    modifier minterOnly() {
    //        require(_rbac.isMinter(_msgSender()), "minter only allowed");
    //        _;
    //    }
}
