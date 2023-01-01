import { ethers } from "hardhat";

async function main() {
  const SoulNft = await ethers.getContractFactory("SoulNft");
  const soulNft = await SoulNft.deploy("T", "T");

  await soulNft.deployed();

  console.log(`deployed to ${soulNft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
