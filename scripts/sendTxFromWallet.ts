import { ethers } from "hardhat";
import {  walletTransfer } from "../test/Wallets";
const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');

const contractAddress = "0x1b0a0f20F1A05ae570e30b2DCABe9b1CfEC9e50E";
const abi = '[{"inputs": [{"internalType": "address","name": "dest","type": "address"},{"internalType": "bytes","name": "cd","type": "bytes"},{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "bytes[]","name": "signatures","type": "bytes[]"}],"name": "call","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "originalKey","type": "address"},{"internalType": "address","name": "newKey","type": "address"},{"internalType": "bytes[]","name": "signatures","type": "bytes[]"}],"name": "replace","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[]","name": "originalKeys","type": "address[]"},{"internalType": "address[]","name": "newKeys","type": "address[]"},{"internalType": "bytes[]","name": "signatures","type": "bytes[]"}],"name": "rotate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "destination","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "bytes[]","name": "signatures","type": "bytes[]"}],"name": "transfer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[]","name": "pubKeys","type": "address[]"}],"stateMutability": "nonpayable","type": "constructor"},{"stateMutability": "payable","type": "receive"},{"inputs": [],"name": "getNonce","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "n","type": "uint256"},{"internalType": "address","name": "destination","type": "address"},{"internalType": "bytes","name": "cd","type": "bytes"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "hashCall","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "uint256","name": "n","type": "uint256"},{"internalType": "address","name": "a","type": "address"},{"internalType": "address","name": "b","type": "address"}],"name": "hashReplace","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "uint256","name": "n","type": "uint256"},{"internalType": "address[]","name": "a","type": "address[]"},{"internalType": "address[]","name": "b","type": "address[]"}],"name": "hashRotate","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "uint256","name": "n","type": "uint256"},{"internalType": "address","name": "destination","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "hashTransfer","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "pure","type": "function"}]';

const dest = '0xF5DF2bd8A867C0A166f5FF6661D8483C6DC48db9';
const amount = ethers.utils.parseEther("0.004");

const KEY_ONE = ec.keyFromPrivate("943c8dba0784cf124ca16de91f1ea35c47f9495e0338819d259a5b0d63d58203");
const KEY_TWO = ec.keyFromPrivate("adb36d4fc3a403f03382cb43794abd1fb93cfbeab620ffacdc3870b6da84bae0");
//const KEY_THREE = ec.keyFromPrivate("c0667a524c77a9b0c8dfdcee2132487e0ef8d7a8a073393d877dbc02ca87c66b");


async function sendTxFromWallet() {
    const signer = (await ethers.getSigners()).at(0);
    const walletContract = new ethers.Contract(contractAddress, abi, signer);
    const keys = [KEY_ONE, KEY_TWO];
    const tx = await walletTransfer(walletContract, keys, dest, amount);
    console.log(tx);
    console.log('Done, check etherscan for your transaction to ' + dest);
}

sendTxFromWallet().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});