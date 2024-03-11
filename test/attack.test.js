const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Vault", function () {
  const AMOUNT = ethers.parseEther("0.1"); //bignumber
  let vault, vaultAddress, attack, attackAddress;
  let owner, attacker;
  let vaultBalance;

  beforeEach(async function () {
    [owner, attacker] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("InsecureEtherVault");
    console.log("Deploying contracts with the account:", owner.address);
    vault = await Vault.connect(owner).deploy();

    vaultAddress = await vault.getAddress();
    console.log("Vault address:", vaultAddress);

    const Attack = await ethers.getContractFactory("Attack");
    console.log("Deploying contracts with the account:", attacker.address);
    attack = await Attack.connect(attacker).deploy(vaultAddress);

    attackAddress = await attack.getAddress();
    console.log("Attack address:", attackAddress);
  });

  it("Attack should withdraw 3 * 0.1 eth from the contract", async function () {
    const txn1 = await vault.connect(owner).deposit({ value: AMOUNT });
    await txn1.wait(1);
    const txn2 = await vault.connect(owner).deposit({ value: AMOUNT });
    await txn2.wait(1);

    console.log("\n== Owner Deposit ==");
    vaultBalance = await vault.getEtherBalance();
    console.log("Vault balance:", vaultBalance.toString());
    vaultBalance = await vault.getUserBalance(owner.address);
    console.log("owner balance:", vaultBalance.toString());
    vaultBalance = await vault.getUserBalance(attackAddress);
    console.log("attacker balance:", vaultBalance.toString());

    const txn3 = await attack.connect(attacker).deposit({ value: AMOUNT });
    await txn3.wait(1);

    console.log("\n== Attacker (Attack) Deposit ==");
    vaultBalance = await vault.getEtherBalance();
    console.log("Vault balance:", vaultBalance.toString());
    vaultBalance = await vault.getUserBalance(owner.address);
    console.log("owner balance:", vaultBalance.toString());
    vaultBalance = await vault.getUserBalance(attackAddress);
    console.log("attack balance:", vaultBalance.toString());

    const txn4 = await attack.connect(attacker).attack();
    await txn4.wait(1);

    console.log("\n== Attacker (Attack) Attack ==");
    vaultBalance = await vault.getEtherBalance();
    console.log("Vault balance:", vaultBalance.toString());
    vaultBalance = await vault.getUserBalance(owner.address);
    console.log("owner balance:", vaultBalance.toString());
    vaultBalance = await vault.getUserBalance(attackAddress);
    console.log("attack balance:", vaultBalance.toString());
  });
});
