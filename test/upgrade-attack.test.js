const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

describe("Vault", function () {
  const AMOUNT = ethers.parseEther("0.01"); //bignumber
  let vault,
    vaultAddress,
    upgradedVault,
    upgradedVaultAddress,
    attack,
    attackAddress;
  let owner, attacker;

  this.timeout(150000);
  beforeEach(async function () {
    [owner, attacker] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("InsecureEtherVault");

    vault = await upgrades.deployProxy(Vault);
    await vault.waitForDeployment();
    vaultAddress = await vault.getAddress();
    console.log("Vault address:", vaultAddress);

    const Attack = await ethers.getContractFactory("Attack");
    attack = await Attack.connect(attacker).deploy(vaultAddress);

    attackAddress = await attack.getAddress();
    console.log("Attack address:", attackAddress);

    const Vaultv2 = await ethers.getContractFactory("SecureEtherVault");
    console.log("Upgrading vault...");
    upgradedVault = await upgrades.upgradeProxy(vaultAddress, Vaultv2);
    await upgradedVault.waitForDeployment();
    upgradedVaultAddress = await upgradedVault.getAddress();
    console.log("upgradedVault address:", upgradedVaultAddress);
    console.log("vault upgraded");
  });

  it("Upgraded Vault should have the same address as the old one", async function () {
    expect(upgradedVaultAddress).to.be.equal(vaultAddress);
  });

  it("Attack should not withdraw eth from the contract", async function () {
    const txn1 = await vault.connect(owner).deposit({ value: AMOUNT });
    await txn1.wait(1);
    const txn2 = await vault.connect(owner).deposit({ value: AMOUNT });
    await txn2.wait(1);

    let vaultBalance1, ownerBalance1, attackBalance1;

    console.log("\n== Owner Deposit ==");
    vaultBalance1 = await vault.getEtherBalance();
    console.log("Vault balance:", vaultBalance1.toString());

    ownerBalance1 = await vault.getUserBalance(owner.address);
    console.log("owner balance:", ownerBalance1.toString());

    attackBalance1 = await vault.getUserBalance(attackAddress);
    console.log("attacker balance:", attackBalance1.toString());

    expect(vaultBalance1).to.be.equal(AMOUNT * 2n);
    expect(ownerBalance1).to.be.equal(AMOUNT * 2n);
    expect(attackBalance1).to.be.equal(0);

    const txn3 = await attack.connect(attacker).deposit({ value: AMOUNT });
    await txn3.wait(1);

    let vaultBalance2, ownerBalance2, attackBalance2;

    console.log("\n== Attacker (Attack) Deposit ==");
    vaultBalance2 = await vault.getEtherBalance();
    console.log("Vault balance:", vaultBalance2.toString());

    ownerBalance2 = await vault.getUserBalance(owner.address);
    console.log("owner balance:", ownerBalance2.toString());

    attackBalance2 = await vault.getUserBalance(attackAddress);
    console.log("attack balance:", attackBalance2.toString());

    expect(vaultBalance2 - vaultBalance1).to.be.equal(AMOUNT);
    expect(ownerBalance2).to.be.equal(ownerBalance2);
    expect(attackBalance2 - attackBalance1).to.be.equal(AMOUNT);

    await expect(attack.connect(attacker).attack()).to.be.revertedWith(
      "Failed to send Ether",
    );

    let vaultBalance3, ownerBalance3, attackBalance3;

    console.log("\n== Attacker (Attack) Attack ==");
    vaultBalance3 = await vault.getEtherBalance();
    console.log("Vault balance:", vaultBalance3.toString());

    ownerBalance3 = await vault.getUserBalance(owner.address);
    console.log("owner balance:", ownerBalance3.toString());

    attackBalance3 = await vault.getUserBalance(attackAddress);
    console.log("attack balance:", attackBalance3.toString());

    expect(vaultBalance3).to.be.equal(vaultBalance2);
    expect(ownerBalance3).to.be.equal(ownerBalance2);
    expect(attackBalance3).to.be.equal(attackBalance2);
  });
});
