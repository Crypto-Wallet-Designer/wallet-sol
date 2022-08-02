import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("IncrementTest", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployIncrement() {
    // Contracts are deployed using the first signer/account by default
    const owner = await ethers.getSigners();
    const Increment = await ethers.getContractFactory("Increment");
    const stw = await Increment.deploy();

    return {stw, owner};
  }

  describe("Deployment", function () {
    it("Should have a valid address", async function () {
      const {stw, owner} = await loadFixture(deployIncrement);
      expect(stw.address).contains("0x");
    });
  });

  describe("Inc a few times", function () {
    it("Should work", async function () {
      const {stw, owner} = await loadFixture(deployIncrement);
      expect(stw.address).contains("0x");
      await stw.inc();
      expect(await stw.getValue()).to.equal(1);
      await stw.incWith(2);
      expect(await stw.getValue()).to.equal(3);
    });
  });

  describe("Payable should work", function () {
    it("Should work", async function () {
      const {stw, owner} = await loadFixture(deployIncrement);
      expect(stw.address).contains("0x");
      await stw.inc();
      expect(await stw.getValue()).to.equal(1);
      const ONE_ETHER = ethers.utils.parseEther("1.0");
      const options = {value: ONE_ETHER}

      await stw.incWithPay(2, options);
      expect(await stw.getValue()).to.equal(3);
      expect(await ethers.provider.getBalance(stw.address)).to.equal(ONE_ETHER);

      const EXACT = ethers.BigNumber.from(1000000000);
      const options2 = {value: EXACT}

      await stw.exactPayToIncrement(5, options2);
      expect(await stw.getValue()).to.equal(8);

      expect(await ethers.provider.getBalance(stw.address)).to.equal(ONE_ETHER.add(EXACT));
    });
  });
});
