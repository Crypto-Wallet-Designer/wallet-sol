import { ethers } from "hardhat";
import { Wallet, BigNumber, Bytes } from "ethers";
let elliptic = require('elliptic');
let sha3 = require('js-sha3');
let ec = new elliptic.ec('secp256k1');

const WALLET_ONE = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be01", ethers.provider);
const WALLET_TWO = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be02", ethers.provider);
const WALLET_THREE = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be03", ethers.provider);
const WALLET_FOUR = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be04", ethers.provider);
const WALLET_FIVE = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be05", ethers.provider);
const WALLET_SIX = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be06", ethers.provider);

const KEY_ONE = ec.keyFromPrivate("222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be01");
const KEY_TWO = ec.keyFromPrivate("222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be02");
const KEY_THREE = ec.keyFromPrivate("222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be03");
const KEY_FOUR = ec.keyFromPrivate("222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be04");
const KEY_FIVE = ec.keyFromPrivate("222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be05");
const KEY_SIX = ec.keyFromPrivate("222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be06");


async function transferTo(w: Wallet, amount: BigNumber) {
    const signer = (await ethers.getSigners()).at(0);

    if (signer) {
    let tx = await signer.sendTransaction({
        to: w.address,
        value: amount,
    });}
}

function sign(key: any, msgHash: any) {
    let privKey = key.getPrivate("hex");
    let sig = ec.sign(msgHash, privKey, "hex", {canonical: true});
    let arr = sig.r.toArray("little", 32);
    arr = arr.concat(sig.s.toArray("little", 32));
    arr.push(sig.recoveryParam);
    return arr;

}

export {
    WALLET_ONE, WALLET_TWO, WALLET_THREE, WALLET_FOUR, WALLET_FIVE, WALLET_SIX,
    KEY_ONE, KEY_TWO, KEY_THREE, KEY_FOUR, KEY_FIVE, KEY_SIX,
    transferTo, sign
}