require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.19',
  },
  networks: {
    // for mainnet
    'base-mainnet': {
      url: 'https://developer-access-mainnet.base.org',
      accounts: [process.env.WALLET_KEY, process.env.FRIEND_KEY],
      chainId: 8453,
    },
    // for testnet
    'base-goerli': {
      url: 'https://goerli.base.org',
      accounts: [process.env.WALLET_KEY, process.env.FRIEND_KEY],
      chainId: 84531,
      gasPrice: 'auto',
    },
    // for local dev environment
    'base-local': {
      url: 'http://127.0.0.1:8545/',
      accounts: [process.env.WALLET_KEY, process.env.FRIEND_KEY],
      chainId: 31337,
      gasPrice: 'auto',
    },
  },
  defaultNetwork: 'base-local',
};
