import { ethers } from "hardhat";
import { Wallet, BigNumber } from "ethers";

const KEY_ONE = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be01", ethers.provider);
const KEY_TWO = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be02", ethers.provider);
const KEY_THREE = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be03", ethers.provider);
const KEY_FOUR = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be04", ethers.provider);
const KEY_FIVE = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be05", ethers.provider);
const KEY_SIX = new ethers.Wallet("0x222a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be06", ethers.provider);

async function transferTo(w: Wallet, amount: BigNumber) {
    const signer = (await ethers.getSigners()).at(0);
    if (signer) {
    let tx = await signer.sendTransaction({
        to: w.address,
        value: amount,
    });}
}

export {
    KEY_ONE, KEY_TWO, KEY_THREE, KEY_FOUR, KEY_FIVE, KEY_SIX,
    transferTo
}