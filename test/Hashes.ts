import {BytesLike, Wallet, Bytes} from "ethers";

const { soliditySha3 } = require("web3-utils");

function hashTransfer(n: number, destination: string, amount: number){
  return soliditySha3("transfer", n, destination, amount)
}

function hashCall(n: number, calldata: BytesLike, amount: number){
  return soliditySha3("call", n, calldata, amount)
}

export{hashTransfer, hashCall}