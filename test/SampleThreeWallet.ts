import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { WALLET_ONE, WALLET_TWO, WALLET_THREE, WALLET_FOUR, WALLET_FIVE, WALLET_SIX,
  KEY_ONE, KEY_TWO, KEY_THREE, KEY_FOUR, KEY_FIVE, KEY_SIX,
  transferTo, sign, walletTransfer, transferToAddress } from "./Wallets";

describe("SampleThreeWallet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deploySampleThree() {
    // Contracts are deployed using the first signer/account by default
    const owner = await ethers.getSigners();

    const SampleThreeWallet = await ethers.getContractFactory("SampleThreeWallet");
    const publicKeys = [
      WALLET_ONE.address,
      WALLET_TWO.address,
      WALLET_THREE.address] // First three addresses in wallets.ts.

    const stw = await SampleThreeWallet.deploy(publicKeys);  //deploy

    return { stw, owner };
  }

  // describe("Deployment", function () {
  //   it("Should have a valid address", async function () {
  //     const { stw, owner } = await loadFixture(deploySampleThree);
  //     expect(stw.address).contains("0x");
  //   });
  // });

  describe("Transfer tests", function () {
    it("Should transfer", async function () {
      const { stw, owner } = await loadFixture(deploySampleThree);
      expect(stw.address).contains("0x");
      expect(await stw.getNonce()).to.eq(0);
      const ONE_ETHER = ethers.utils.parseEther("1.0");
      const TWO_ETHER = ethers.utils.parseEther("2.0");
      const THREE_ETHER = ethers.utils.parseEther("3.0");
      const FOUR_ETHER = ethers.utils.parseEther("4.0");
      const FIVE_ETHER = ethers.utils.parseEther("5.0");

      await transferToAddress(stw.address,FIVE_ETHER);
      expect(await ethers.provider.getBalance(stw.address)).to.equal(FIVE_ETHER);
      await walletTransfer(stw, [KEY_ONE, KEY_TWO], WALLET_SIX.address, ONE_ETHER);
      expect(await ethers.provider.getBalance(WALLET_SIX.address)).to.equal(FIVE_ETHER); // already 4 ether from previous test
      expect(walletTransfer(stw, [KEY_ONE], WALLET_SIX.address, ONE_ETHER)).to.revertedWith("Not Authorized");
      expect(walletTransfer(stw, [KEY_ONE, KEY_ONE], WALLET_SIX.address, ONE_ETHER)).to.revertedWith("Not Authorized");
      expect(walletTransfer(stw, [], WALLET_SIX.address, ONE_ETHER)).to.revertedWith("Not Authorized");
      expect(walletTransfer(stw, [KEY_SIX, KEY_FIVE], WALLET_SIX.address, ONE_ETHER)).to.revertedWith("Not Authorized");

    });
  });

});
