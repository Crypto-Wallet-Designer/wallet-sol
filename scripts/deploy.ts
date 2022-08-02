import { ethers } from "hardhat";

async function main() {
  const sampleThree = await ethers.getContractFactory("SampleThreeWallet");
  const deployedSampleThree = await sampleThree.deploy(["0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"], );

  await deployedSampleThree.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
