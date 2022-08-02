import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { KEY_ONE, transferTo } from "./Wallets";

describe("SimpleTransferTest", function () {
    describe("Transfer some stuff", function () {
        const ONE_ETHER = ethers.utils.parseEther("1.0");
        
      it("Should transfer", async function () {
        expect(await ethers.provider.getBalance(KEY_ONE.address)).to.equal(0);
        await transferTo(KEY_ONE, ONE_ETHER);
        expect(await ethers.provider.getBalance(KEY_ONE.address)).to.equal(ONE_ETHER);

    });
    });
  
  
  });
  
