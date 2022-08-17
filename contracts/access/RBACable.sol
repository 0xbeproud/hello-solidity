// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./RBAC.sol";

abstract contract RBACable {
    RBAC _rbac;

    constructor(RBAC rbac) {
        _rbac = rbac;
    }
}
