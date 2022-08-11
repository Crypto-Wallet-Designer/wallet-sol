import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { WALLET_ONE, WALLET_TWO, WALLET_THREE, WALLET_FIVE, KEY_ONE, KEY_TWO, keyReplace, KEY_FIVE} from "./Wallets";


describe("KeyReplacementTest", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deploybool() {
    // Contracts are deployed using the first signer/account by default
    const owner = await ethers.getSigners();

    const BaseWallet = await ethers.getContractFactory("SampleThreeWallet");
    const publicKeys = [
        WALLET_ONE.address,
        WALLET_TWO.address,
        WALLET_THREE.address] // First three addresses in hardhat local node.

    const stw = await BaseWallet.deploy(publicKeys);

    return { stw, owner };
  }

describe("KeyReplaceTest", function () {
    describe("Replace a key", function () {
      it("Should replace", async function () {
        const { stw, owner } = await loadFixture(deploybool);
        expect(stw.address).contains("0x");
        expect(await stw.getNonce()).to.eq(0);
        // console.log((WALLET_ONE.address))
        console.log("       Check first the public key in wallet is key one")
        expect(await stw.returnPublickeyIndex(WALLET_ONE.address)).to.eq(1);
        console.log("       Now we have the KEY_ONE(pub) in wallet")
        console.log("       Start to replace key")
        await keyReplace(stw, WALLET_ONE.address, WALLET_FIVE.address, [KEY_ONE, KEY_TWO]);
        console.log("       Now the first key is key five")
        expect(await stw.returnPublickeyIndex(WALLET_FIVE.address)).to.eq(1);

    });
    });
  
  });
  
});