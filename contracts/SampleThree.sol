// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./BoolWallet.sol";

contract SampleThreeWallet is BoolWallet {
    constructor(address[] memory pubKeys) BoolWallet(pubKeys) {
    }

    function boolAuthorized(bool[] memory k) internal pure override returns (bool) {
        return (k[0] && k[1]) || k[2];
    }
}