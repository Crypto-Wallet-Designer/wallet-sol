import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { WALLET_ONE, transferTo, sign, KEY_ONE } from "./Wallets";

describe("SimpleTransferTest", function () {
    describe("Transfer some stuff", function () {
        const ONE_ETHER = ethers.utils.parseEther("1.0");
        
      it("Should transfer", async function () {
        expect(await ethers.provider.getBalance(WALLET_ONE.address)).to.equal(0);
        await transferTo(WALLET_ONE, ONE_ETHER);
        expect(await ethers.provider.getBalance(WALLET_ONE.address)).to.equal(ONE_ETHER);

    });
    });

    describe("Sign some stuff", function () {
        const ONE_ETHER = ethers.utils.parseEther("1.0");
        
      it("Should sign", async function () {
        let sig = sign(KEY_ONE, "0x299a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be77");
        expect(sig.length).to.eq(65);

    });
    });
  
  
  });
  
