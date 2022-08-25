// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./RBAC.sol";
import "@openzeppelin/contracts/utils/Context.sol";

abstract contract RBACable is Context {
    RBAC internal rbac;

    constructor(RBAC _rbac) {
        rbac = _rbac;
    }

    modifier adminOnly() {
        require(rbac.isAdmin(_msgSender()), "admin only allowed");
        _;
    }

    modifier moderatorOnly() {
        require(rbac.isAdmin(_msgSender()) || rbac.isModerator(_msgSender()), "moderator only allowed");
        _;
    }
}
