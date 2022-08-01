// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./AbstractWallet.sol";

contract MoNWallet is AbstractWallet {
    uint required;
    constructor(uint requiredSigs, address[] memory pubKeys) AbstractWallet(pubKeys) {
        required = requiredSigs;
    }

    function isAuthorized(bytes32 msgHash, bytes[] calldata signatures) internal view override returns (bool) {
        uint count = 0;
        for(uint i = 0; i < signatures.length; i++) {
            if (keys[recoverSig(signatures[i], msgHash)] > 0) {
                count++;
            }
        }
        return count >= required;
    }
}