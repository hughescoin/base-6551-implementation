# Create an NFT with a Token Bound Account

This guide demonstrates how to create and interact with three smart contracts:

- An ERC721 smart contract that serves as our NFT.
- A registry contract that deploys another smart contract.
- A smart contract wallet (aka Token Bound Account) that will be owned by the NFT holder.

## Tools

We will use a few tools to write and deploy our smart contracts:

- [Hardhat](https://hardhat.org/): Helps deploy and interact with smart contracts.
- [Node.js](https://nodejs.org/en): Developer environment.
- [OpenZeppelin](https://www.openzeppelin.com/contracts): An open library for building secure smart contracts.
- [Coinbase Wallet](https://www.coinbase.com/wallet/): Non-custodial wallet for creating accounts and interacting with the blockchain.

## Environment Setup

1. Clone this repo.
2. Change into the directory using `cd erc-6551-implementation`.
3. Initiate a node project and install hardhat:
   ```bash
   npm install --save-dev hardhat
   ```
4. Create a .env file in the root (erc-6551-implementation/) folder:
   `touch .env`
5. Add the following code to your .env file:
   ```
   WALLET_KEY=<Private Key of an account>
   WALLET2_ADDR=<Address of an additional wallet>
   WALLET2_KEY=<Private key of an additional account>
   ```

## Wallet setup

Assuming you have set up your wallet (and safely stored away your seed phrase) and have some funds (testnet or mainnet), let's obtain the addresses and private keys needed for the demo.

### Enable Testnets

1. Click on the Settings tab.
2. Select Developer Settings.
3. Toggle "Testnets" on.

### Switch Wallets + Copy Address

1. From the assets tab, click on the current address/account.
2. Select another address.

_Note: Each account will need funds in order to deploy contracts and interact with Base._

### Copy Private Key

_Do not share this with anyone._

1. Click on the Settings tab.
2. Select Developer Settings.
3. Click on Show Private Key.
4. Enter password and check the disclaimer.

### Request Testnet Funds

5. Click on the Settings tab.
6. Select Networks.
7. Choose Testnets.
8. Click on the Water icon.
9. Request testnet funds.

## Run Scripts

1. `npx hardhat run scripts/01_deploy_contracts.js` will deploy, mint, and assign an NFT to the `WALLET2_ADDR`.
2. `npx hardhat run scripts/02_create_account.js` will have the Registry contract create the token bound account and compute its address.
3. `npx hardhat run scripts/03_account_interaction.js` will send funds from `WALLET_KEY` to the token bound account and transfer ownership of the NFT from `WALLET2_ADDR` to `WALLET_KEY`.

Congrats!
