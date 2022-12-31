import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Rent", function () {
  async function RentFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account] = await ethers.getSigners();

    const Rent = await ethers.getContractFactory("Rent");
    const rent = await Rent.deploy("T", "T");

    return { owner, account, rent };
  }

  it("should set user to Bob", async () => {
    // Get initial balances of first and second account.
    const { owner, account, rent } = await loadFixture(RentFixture);

    await rent.mint(1, owner.address);
    let expires = Math.floor(new Date().getTime() / 1000) + 1000;
    await rent.setUser(1, account.address, BigInt(expires));

    let user_1 = await rent.userOf(1);
    //assert.equal(user_1, account, "User of NFT 1 should be Bob");
    expect(user_1).to.equal(account.address);
    let owner_1 = await rent.ownerOf(1);
    //assert.equal(owner_1, account, "Owner of NFT 1 should be Alice");
    expect(owner_1).to.equal(owner.address);
  });
});
