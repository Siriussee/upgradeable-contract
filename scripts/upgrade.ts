import { ethers, upgrades } from "hardhat";

async function main() {
  const VAULT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
