const hre = require('hardhat');
const fs = require('fs');
const { deploymentFile } = require('../config');
const deploymentData = fs.readFileSync(deploymentFile, 'utf-8');
const contracts = JSON.parse(deploymentData);

const nftContract = contracts[0].NftContract.address;
const registryContract = contracts[1].ERC6551Registry.address;
const accountImplementation = contracts[2].ERC6551Account.address;

async function setupAccount() {
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  const ERC6551Registry = await hre.ethers.getContractAt(
    'ERC6551Registry',
    registryContract
  );
  const computedAddress = await ERC6551Registry.account(
    accountImplementation, //implementation address
    chainId,
    nftContract,
    0, //tokenId
    0 //salt
  );
  console.log('Computed Address: ', computedAddress);
  const tx = await ERC6551Registry.createAccount(
    accountImplementation,
    chainId,
    nftContract,
    0,
    0,
    '0x' // initData
  );
}

setupAccount();
