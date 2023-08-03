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
      accounts: [process.env.WALLET_KEY],
      chainId: 84531,
    },
    // for testnet
    'base-goerli': {
      url: 'https://goerli.base.org',
      accounts: [process.env.WALLET_KEY],
      chainId: 84531,
    },
    // for local dev environment
    'base-local': {
      url: 'http://127.0.0.1:8545/',
      accounts: [process.env.WALLET_KEY],
      chainId: 31337,
    },
  },
  defaultNetwork: 'base-local',
};
