import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HellBank } from "../typechain-types";

describe("HellBank", function () {
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let hellbank;

  beforeEach(async function () {
    const HellBank = await ethers.getContractFactory("HellBank");
    hellbank = await HellBank.deploy();
    await hellbank.deployed();

    [owner, addr1] = await ethers.getSigners();
  });

  it("Should successfully execute win() when the debit is 0 and credit is maxed", async function () {
    await hellbank.connect(addr1).begin();
    //INSERISCI QUI IL TUO CODICE
    expect(await hellbank.connect(addr1).win()).to.equal(true);
  });
});
