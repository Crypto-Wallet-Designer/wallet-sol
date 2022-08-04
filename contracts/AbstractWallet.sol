// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

abstract contract AbstractWallet {
    uint nonce;
    mapping (address => uint) keys;

    constructor(address[] memory pubKeys) {
        for (uint i = 0; i < pubKeys.length; i++) {
            keys[pubKeys[i]] = i+1;
        }

    }
    
    receive() external payable { }

    function getNonce() public view returns (uint) {
        return nonce;
    }

    function isAuthorized(bytes32 msgHash, bytes[] calldata signatures) internal virtual returns (bool);

    function transfer(address payable destination, uint amount, bytes[] calldata signatures) external {
        uint n  = nonce;
        bytes32 msgHash = hashTransfer(n, destination, amount);
        require(isAuthorized(msgHash, signatures), "Not Authorized");
        nonce = n + 1;
        destination.transfer(amount);
    }

    function hashTransfer(uint n, address destination, uint amount) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("transfer", n, destination, amount));
    }

    function call(address dest, bytes calldata cd, uint amount, bytes[] calldata signatures) external {
        uint n  = nonce;
        bytes32 msgHash = hashCall(n, dest, cd, amount);
        require(isAuthorized(msgHash, signatures), "Not Authorized");
        nonce = n + 1;
        (bool success, bytes memory errMsg) = dest.call{value:amount}(cd);
        require(success, string(errMsg));
    }

    function hashCall(uint n, address destination, bytes calldata cd, uint amount) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("call", n, destination, cd, amount));
    }

    function replace(address originalKey, address newKey, bytes[] calldata signatures) external {
        require(keys[originalKey] != 0, "Not an original key");
        require(keys[newKey] == 0, "Not an new key");
        uint n  = nonce;
        bytes32 msgHash = hashReplace(n, originalKey, newKey);
        require(isAuthorized(msgHash, signatures), "Not Authorized");
        nonce = n + 1;
        keys[newKey] = keys[originalKey];
        keys[originalKey] = 0;
    }

    function hashReplace(uint n, address a, address b) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("replace", n, a, b));
    }

    function recoverSig(bytes calldata sig, bytes32 msgHash) internal pure returns (address) {
        uint8 v = uint8(sig[64]);
        uint src;
        assembly {
            src := sig.offset
        }
        bytes32 r;
        assembly {
            r := calldataload(src)
        }
        src += 0x20;
        bytes32 s;
        assembly {
            s:= calldataload(src)
        }
        return ecrecover(msgHash, v, r, s);
    }
}