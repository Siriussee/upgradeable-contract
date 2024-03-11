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
yarn add -D hardhat
yarn add -D typescript
yarn add -D ts-node
yarn add -D @nomicfoundation/hardhat-toolbox
yarn add -D @openzeppelin/hardhat-upgrades
yarn add -D @nomicfoundation/hardhat-ethers ethers
npx hardhat init
```

## If you clone this repo

```
yarn install
```

## Deploy and Interact with Vault

```
npx hardhat run scripts/deploy.ts --network localhost
```

Update the script and

```
npx hardhat run --network localhost scripts/deposit.ts
npx hardhat run --network localhost scripts/query.ts
```

## Attach the Insecure Vault

```
npx hardhat test test/attack.test.js --network hardhat
```

## Upgrade the Vault

```
npx hardhat run scripts/upgrade.ts --network localhost
```

## Attack against an upgraded Vault

```
npx hardhat test test/upgrade-attack.test.js --network hardhat
```
