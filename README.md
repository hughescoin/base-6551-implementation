# Create an NFT with a Token Bound Account

This guide demonstrates how to create and interact with three smart contracts:

- An [ERC721](https://docs.openzeppelin.com/contracts/4.x/erc721) smart contract that serves as our NFT.
- A [registry contract](https://eips.ethereum.org/EIPS/eip-6551) that deploys another smart contract.
- A smart contract wallet (a.k.a. Token Bound Account) that will be owned by the NFT holder.

## Tools

We will use a few tools to write and deploy our smart contracts:

- [Hardhat](https://hardhat.org/): Helps deploy and interact with smart contracts.
- [Node.js](https://nodejs.org/en): Developer environment.
- [OpenZeppelin](https://www.openzeppelin.com/contracts): An open library for building secure smart contracts.
- [Coinbase Wallet](https://www.coinbase.com/wallet/): Non-custodial wallet for creating accounts and interacting with the blockchain.

## Wallet setup

Assuming you have set up your wallet (and safely stored away your seed phrase) and have some funds (testnet or mainnet), let's obtain the addresses and private keys needed for the demo.

### Enable Testnets

1. Click on the Settings tab

![Settings tab](images/enable_testnet.png)

2. Select "Developer Settings"

![Developer settings](images/enable_testnet_settings.png)

3. Toggle "Testnets" on

![Enable testnets](images/enable_testnet_toggle.png)

### Switch Wallets + Copy Address

1. From the assets tab, click on the current address/account

![Assets tab](images/assets_tab.png)

2. Select another wallet/account

![Select another account](images/select_wallet.png)

3. Copy the address of the newly selected wallet/account

![Copy address](images/copy_address.png)

_Note: Each account will need funds in order to deploy contracts and interact with Base._

### Copy Private Key

_Do not share this with anyone._

1. Click on the Settings tab

![Settings tab](images/enable_testnet.png)

2. Select "Developer Settings"

![Developer settings](images/enable_testnet_settings.png)

3. Click on "Show private key"

![Show private key](images/private_keys.png)

4. Enter password

![Enter password](images/private_keys_show1.png)

5. Read disclaimer to copy address

![accept terms](images/private_keys_copy2cb.png)

### Request Testnet Funds

1. Click on the Settings tab

![Settings tab](images/enable_testnet.png)

2. Select "Networks"

![Networks tab](images/testnet_networks.png)

3. Select "Testnets" tab

![Testnets](images/testnet_select_tab.png)

4. Click on the water (💧) icon

![Request funds](images/testnet_base.png)

5. Request testnet funds

![Request funds](images/testnet_base_request.png)

## Environment Setup

1. Clone this repo.
2. Change into the directory using `cd erc-6551-implementation`.
3. Initiate a node project and install hardhat:
   ```bash
   npm install
   ```
4. Create a .env file in the root (erc-6551-implementation/) folder by typing
   `touch .env`
5. Add the following code to your .env file:
   ```
   WALLET_KEY=<Private Key of an account>
   WALLET2_ADDR=<Address of an additional wallet>
   WALLET2_KEY=<Private key of an additional account>
   ```

## Run Scripts

1. `npx hardhat run scripts/01_deploy_contracts.js --network base-goerli` will deploy, mint, and assign an NFT to the `WALLET2_ADDR`.
2. `npx hardhat run scripts/02_create_account.js --network base-goerli` will have the Registry contract create the token bound account and compute its address.
3. `npx hardhat run scripts/03_account_interaction.js --network base-goerli` will send funds from `WALLET_KEY` to the token bound account and transfer ownership of the NFT from `WALLET2_ADDR` to `WALLET_KEY`.

# Congrats!
