import { ethers } from "hardhat";

async function main() {
  const Lock = await ethers.getContractFactory("SampleThreeWallet");
  const lock = await Lock.deploy(["0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"], );

  await lock.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
