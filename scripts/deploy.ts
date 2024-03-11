import { ethers, upgrades } from "hardhat";

async function main() {
  let time = Date.now();

  const [owner] = await ethers.getSigners();
  let vault, vaultAddress;
  console.log("Deploying contracts with the account:", owner.address);

  const Vault = await ethers.getContractFactory("InsecureEtherVault");
  vault = await upgrades.deployProxy(Vault);
  await vault.waitForDeployment();
  vaultAddress = await vault.getAddress();
  console.log("Vault address:", vaultAddress);
  console.log("Time taken:", Date.now() - time);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
