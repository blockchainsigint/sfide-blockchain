import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTToken } from "../typechain-types";

describe("NFTToken", function () {
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let nft: NFTToken;

  beforeEach(async function () {
    const Nft = await ethers.getContractFactory("NFTToken");
    nft = await Nft.deploy();
    await nft.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should return name and symbol", async function () {
    expect(await nft.name()).to.equal("Soulbound");
    expect(await nft.symbol()).to.equal("SBNFT");
  });

  it("Should set the first account as the owner", async () => {
    expect(await nft.owner()).to.equal(owner.address);
  });

  it("Should NOT mint a token as NOT the Owner", async () => {
    await expect(nft.connect(addr1).safeMint(addr1.address)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should mint a token as the Owner", async () => {
    await nft.safeMint(addr1.address);
    expect(await nft.ownerOf(0)).to.equal(addr1.address);
    expect(await nft.balanceOf(addr1.address)).to.equal(1);
  });

  it("Should not be able to transfer soulbound token", async () => {
    await nft.safeMint(owner.address);

    //OVERLOADED TRANSFER function
    await expect(
      nft["safeTransferFrom(address,address,uint256)"](
        owner.address,
        addr2.address,
        0
      )
    ).to.be.revertedWith("Soulbound nft can't be transferred");
  });

  it("Should NOT transfer the contract NON owner to the new owner", async () => {
    await expect(
      nft.connect(addr1).transferOwnership(addr2.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should transfer the contract owner to the new owner", async () => {
    await nft.transferOwnership(addr2.address);
    expect(await nft.owner()).to.equal(addr2.address);
  });
});
