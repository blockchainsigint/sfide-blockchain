import { ethers } from "hardhat";

async function main() {
  const Rent = await ethers.getContractFactory("Rent");
  const rent = await Rent.deploy("T", "T");

  await rent.deployed();

  console.log(`deployed to ${rent.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
