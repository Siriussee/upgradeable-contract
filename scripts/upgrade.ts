import { ethers, upgrades } from "hardhat";

async function main() {
  const VAULT_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
  let time = Date.now();

  const [owner] = await ethers.getSigners();
  console.log("Upgrading contracts with the account:", owner.address);

  const SecureVault = await ethers.getContractFactory("SecureEtherVault");
  const secureVault = await upgrades.upgradeProxy(VAULT_ADDRESS, SecureVault);
  console.log("Vault upgraded");

  let vaultAddress = await secureVault.getAddress();
  console.log("Vault address:", vaultAddress);
  console.log("Time taken:", Date.now() - time);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
