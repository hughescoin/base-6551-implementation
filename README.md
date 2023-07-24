# Create an NFT with a Token Bound Account

- Implements ERC 721
- Implements ERC 6551
- Has an image hosted on IPFS

## Tools used

- Hardhat
- Node.js
- OpenZeppelin

## Setup

1. Create a folder to house your project then open that directory
   `mkdir base-nft-project`
   `cd base-nft-project`
2. Initiate a node project + install hardhat
   `npm init` - initializes a npm project
   `npm isntall --save-dev harhdaht` - install hardhat
   `npx hardhat` - create project
   Select "create empty hardhat.config.js"
3. Install hardhat toolbox
   The `@nomicfoundation/hardhat-toolbox` plugin bundles all the commonly used packages and Hardhat plugins we recommend to start developing with Hardhat. It allows us to use Ethers to interact with the blockchain.
   `npm install --save-dev @nomicfoundation/hardhat-toolbox`
4. install dotenv to store environment variables that contain mnemonic, private keys, and other sensistive information.
   `npm install --save-dev dotenv`
5. create a .env file in the root (`nft-base-project/`) folder:
   `touch .env`
6. Install OpenZeppelin Contracts API
   `npm install @openzeppelin/contracts`

### Configure the hardhat project to work with Base.

    require('@nomicfoundation/hardhat-toolbox');
    require('dotenv').config();
    /** @type import('hardhat/config').HardhatUserConfig */

    module.exports = {

    solidity: {
    version:  '0.8.19',
    },
    networks: {
    // for mainnet
    'base-mainnet': {
    url:  'https://developer-access-mainnet.base.org',
    accounts: [process.env.WALLET_KEY],
    },
    // for testnet
    'base-goerli': {
    url:  'https://goerli.base.org',
    accounts: [process.env.WALLET_KEY],
    },
    // for local dev environment
    'base-local': {
    url:  'http://localhost:8545',
    accounts: [process.env.WALLET_KEY],
    },
    },
    defaultNetwork:  'base-local',
    };

## Store Wallet Private Key as env variables

This tutorial assumes that you already have a crypto wallet and are familiar with the basics of sending/receiving crypto and understand what a private key and seed phrase is.

If you do not have a wallet and want to follow along, download a wallet from [Coinbase Wallet (Preferred)](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)
or [MetaMask](https://metamask.io/download/).

### Copy the private key

1. Open the Coinbase Wallet Extension:
2. Settings
3. Developer Settings
4. Show private key
5. Enter wallet password (not your seed phrase)
6. Copy private key to your clipboard

### Store Private Key to `.env` file

`WALLET_KEY=<YOUR_PRIVATE_KEY>`

Awesome! We've now set up our project and we are ready to start writing out smart contracts that will create our NFTs.

## Contract Development

We will be creating and deploying three smart contracts:

1. Contract 1: The NFT itself. This will be an ERC-721 token that will own the Token Bound Account
2. Contract 2: The Registry contract. This is the smart contract responsible for create an wallet this is owned by out NFT and the NFT owner
3. Contract 3: The Smart Wallet (account)

### Create the NFT Contract (ERC6551)

Create NFT contract 721
Create the TBA - 6551
Create Registry

### Create an ERC-721 (NFT)

navigate to the contracts folder `base-nft-project/contracts`
create a new file called `MyERC721.sol`

`base-nft-project/contracts/MyERC721.sol`:

    // SPDX-License-Identifier: MIT
    import {ERC721} from  "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import  "@openzeppelin/contracts/utils/Counters.sol";

    pragma  solidity ^0.8.19;
    contract  FocusFoxes  is  ERC721 {
        using  Counters  for  Counters.Counter; //explain this
        Counters.Counter  private _tokenIds;
        constructor() ERC721("FocusedFoxes","BFF") {}
        function  createSupply(address  friend)public  returns(uint256){

        uint256 newTokenId = _tokenIds.current();
        _safeMint(friend, newTokenId);
        _tokenIds.increment();

        return newTokenId;
      }
    }

### Deploy NFT

Let's now deploy our NFT contract by

1. Create a new file in the scripts folder `base-nft-project/scripts/` called `01_deploy_Nft.js`
2. Edit the file to contain the following lines of code
