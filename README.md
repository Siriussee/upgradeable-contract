# Upgrade Demo in Hardhat

node 18 is required for this demo

```
nvm install 18
nvm use 18
```

## Initialize Everything

Follow only if you start from scratch. If you clone this GitHub repo, skip this section.

```
npm install -g yarn
yarn init --yes
yarn add -D ....
# there're a lot of packages you're to install. Check package file.
npx hardhat init
```

## If you clone this repo

```
yarn install
```

# Do it step-by-step

## Get your localhost node running

Open a new terminal,

```
npx hardhat node
```

## Deploy and Interact with Vault

```
npx hardhat run scripts/deploy.ts --network localhost
```
```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Vault address: 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
```

Copy paste the vault address to `scripts/deposit.ts`, and `scripts/query.ts`

```
npx hardhat run --network localhost scripts/deposit.ts
npx hardhat run --network localhost scripts/query.ts
```

## Deploy attack contract

```
npx hardhat run scripts/deploy.attack.ts --network localhost 
```
```
Deploying contracts with the account: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Attack address: 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0
Time taken: 125
```

## Launch attack

```
npx hardhat run scripts/attack.full.ts --network localhost
```
```
--- owner deposit ---
vault balance:  2000000000000000000n
owner balance:  2000000000000000000n
--- attack contract deposit ---
vault balance:  3000000000000000000n
owner balance:  2000000000000000000n
attack contract balance:  1000000000000000000n
--- attacker contract withdraw ---
vault balance:  0n
owner balance:  2000000000000000000n
attack contract balance:  0n
```

## Upgrade the Vault

```
npx hardhat run scripts/upgrade.ts --network localhost
```
```
Upgrading contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Vault upgraded
Vault address: 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
Time taken: 205
```

## Deposit and attack again

The attack will be reverted as the attack cannot withdraw a 2nd time.

```
npx hardhat run --network localhost scripts/deposit.ts
npx hardhat run scripts/attack.full.ts --network localhost
```
```
--- owner deposit ---
vault balance:  2000000000000000000n
owner balance:  4000000000000000000n
--- attack contract deposit ---
vault balance:  3000000000000000000n
owner balance:  4000000000000000000n
attack contract balance:  1000000000000000000n
--- attacker contract withdraw ---
ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'Failed to send Ether'
```

Also, we see that vault balance (3 ETH) < owner balance (4 ETH), because of the previous successful attack. States and balance are preserved after update.

# Do it all together with unit test

## Attack the Insecure Vault

```
npx hardhat test test/attack.test.js --network hardhat
```

Note: this will create a new `InsecureEtherVault` and `Attack` contract.
```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Vault address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Deploying contracts with the account: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Attack address: 0x8464135c8F25Da09e49BC8782676a84730C318bC

== Owner Deposit ==
Vault balance: 200000000000000000
owner balance: 200000000000000000
attacker balance: 0

== Attacker (Attack) Deposit ==
Vault balance: 300000000000000000
owner balance: 200000000000000000
attack balance: 100000000000000000

== Attacker (Attack) Attack ==
Vault balance: 0
owner balance: 200000000000000000
attack balance: 0
    ✔ Attack should withdraw 3 * 0.1 eth from the contract


  1 passing (382ms)
```

## Attack against an upgraded Vault

```
npx hardhat test test/upgrade-attack.test.js --network hardhat
```

```
Vault address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Attack address: 0x8464135c8F25Da09e49BC8782676a84730C318bC
Upgrading vault...
upgradedVault address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
vault upgraded
    ✔ Upgraded Vault should have the same address as the old one
Vault address: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
Attack address: 0x71C95911E9a5D330f4D621842EC243EE1343292e
Upgrading vault...
upgradedVault address: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
vault upgraded

== Owner Deposit ==
Vault balance: 20000000000000000
owner balance: 20000000000000000
attacker balance: 0

== Attacker (Attack) Deposit ==
Vault balance: 30000000000000000
owner balance: 20000000000000000
attack balance: 10000000000000000

== Attacker (Attack) Attack ==
Vault balance: 30000000000000000
owner balance: 20000000000000000
attack balance: 10000000000000000
    ✔ Attack should not withdraw eth from the contract (299ms)


  2 passing (761ms)
```