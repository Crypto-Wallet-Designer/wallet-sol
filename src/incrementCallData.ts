import {ethers} from "hardhat";
import {getAddress} from "ethers/lib/utils";

async function getIncrementContract() {
    const nullAddressString = "0x0000000000000000000000000000000000000000";
    const incrementFactory = await ethers.getContractFactory("Increment");
    return incrementFactory.attach(getAddress(nullAddressString));
}

async function getValueCallData() {
    const contract = await getIncrementContract();
    return (await contract.populateTransaction.getValue()).data;
}

async function incCallData() {
    const contract = await getIncrementContract();
    return (await contract.populateTransaction.inc()).data;
}

async function incWithCallData(val: bigint) {
    const contract = await getIncrementContract();
    return (await contract.populateTransaction.incWith(val)).data;
}

async function incWithPayCallData(val: bigint) {
    const contract = await getIncrementContract();
    return (await contract.populateTransaction.incWithPay(val)).data;
}

async function exactPayToIncrementCallData(val: bigint) {
    const contract = await getIncrementContract();
    return (await contract.populateTransaction.exactPayToIncrement(val)).data;
}

export {
    getValueCallData,
    incCallData,
    incWithCallData,
    incWithPayCallData,
    exactPayToIncrementCallData
}