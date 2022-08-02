import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MoNWalletTest", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deploy2of3() {
    // Contracts are deployed using the first signer/account by default
    const owner = await ethers.getSigners();

    const MoNWallet = await ethers.getContractFactory("MoNWallet");
    const publicKeys = [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"] // First three addresses in hardhat local node.

    const stw = await MoNWallet.deploy(2, publicKeys);

    return { stw, owner };
  }

  describe("Deployment 2 of 3", function () {
    it("Should have a valid address", async function () {
      const { stw, owner } = await loadFixture(deploy2of3);
      expect(stw.address).contains("0x");
    });
  });


});
