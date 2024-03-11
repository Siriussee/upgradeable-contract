import { ethers } from "hardhat";

async function main() {
  let time = Date.now();

  let vault;
  const [owner, attacker] = await ethers.getSigners();
  vault = await ethers.getContractAt(
    "InsecureEtherVault",
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    // make sure this address is the address you just deployed
    owner,
  );
  const vaultBalance = await vault.getEtherBalance();
  const ownerBalance = await vault.getUserBalance(owner.address);
  const attackerBalance = await vault.getUserBalance(attacker.address);

  console.log("owner address:", owner.address);
  console.log("attacker address:", attacker.address);
  console.log("vault balance:", vaultBalance.toString());
  console.log("owner balance:", ownerBalance.toString());
  console.log("attacker balance:", attackerBalance.toString());

  console.log("Time taken:", Date.now() - time);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
