const ethers = require("ethers");
const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');
const contract = require("../artifacts/contracts/SampleThreeWallet.sol/SampleThreeWallet.json");

const contractAddress = "0x0fd2BF200315F3C6b8841580b58204c37666c927";

const dest = '';

const KEY_ONE = ec.keyFromPrivate("");
const KEY_TWO = ec.keyFromPrivate("");
const KEY_THREE = ec.keyFromPrivate("");
const KEY_FOUR = ec.keyFromPrivate("");

API_KEY = "";
PRIVATE_KEY = "";

async function walletTransfer(wallet, keys, dest, amount) {
    let nonce = await wallet.getNonce();
    let msgHash = await wallet.hashTransfer(nonce, dest, amount);
    let sigs = [];
    for (let key of keys) {
        sigs.push(sign(key, msgHash));
    }
    return wallet.transfer(dest, amount, sigs);
}

function sign(key, msgHash) {
    let privateKey = key.getPrivate("hex");
    let sig = ec.sign(msgHash.substring(2), privateKey, "hex", {canonical: true});
    let arr = sig.r.toArray("little", 32);
    arr = arr.concat(sig.s.toArray("little", 32));
    arr.push(sig.recoveryParam + 27);
    return arr;
}

async function ensureWalletHasTxGas(address, signer, provider) {
    const walletBalance = await provider.getBalance(address);
    if (walletBalance.lte('0x2386f26fc10000')) { // 0.1 eth
        console.log('Funding contract');
        if (signer) {
            let tx = await signer.sendTransaction({
                to: address,
                value: ethers.utils.parseEther("0.05"),
                gasLimit: 50000
            });
            console.log(`tx hash: ${tx.hash}`);
            console.log('Waiting 45s for confirmation....');
            await new Promise(r => setTimeout(r, 45000));
        }
    }
}

async function sendTxFromWallet() {
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", API_KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, infuraProvider);
    const walletContract = new ethers.Contract(contractAddress, contract.abi, signer);

    await ensureWalletHasTxGas(contractAddress, signer, infuraProvider);

    const keys = [KEY_ONE];

    const amount = ethers.utils.parseEther("0.004");
    let txReceipt = await walletTransfer(walletContract, keys, dest, amount);
    console.log(`transfer tx hash: ${txReceipt.hash}`);
}

sendTxFromWallet().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});