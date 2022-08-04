import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { WALLET_ONE, KEY_ONE, KEY_TWO, keyReplace, KEY_FIVE} from "./Wallets";

describe("KeyReplaceTest", function () {
    describe("Replace a key", function () {
      it("Should replace", async function () {
        expect(WALLET_ONE.publicKey[0]).to.equal(KEY_ONE);
        await keyReplace(WALLET_ONE, KEY_ONE, KEY_FIVE);
        expect(WALLET_ONE.publicKey[0]).to.equal(KEY_FIVE);

    });
    });
  
  });
  
