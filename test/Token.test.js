const hre = require('hardhat');
const { expect, assert } = require('chai');
const { isAddress } = require('ethers');
require('dotenv').config();

// describe('Contract deployments', () => {
//   //beforeEach(() => {});
//   it('Deploys an ERC721 Token', async () => {
//     const contract = await hre.ethers.deployContract('Token');
//     await contract.waitForDeployment();
//     assert.ok(contract.target);
//     console.log(contract.target);
//   });
//   it('Deploys an ERC6551 Registry', async () => {
//     const contract = await hre.ethers.deployContract('ERC6551Registry');
//     await contract.waitForDeployment();
//     assert.ok(contract.target);
//     console.log(contract.target);
//   });
//   it('Deploys an ERC6551 Account Implementation', async () => {
//     const contract = await hre.ethers.deployContract('ERC6551Account');
//     await contract.waitForDeployment();
//     assert.ok(contract.target);
//     console.log(contract.target);
//   });
// });

// describe('ERC721 Ownership', () => {
//   let nftContract;
//   let address;
//   let provider;
//   let signer;
//   beforeEach(async () => {
//     provider = ethers.provider;
//     signer = await provider.getSigner(0);
//     address = signer.address;
//     nftContract = await hre.ethers.deployContract('Token');
//     await nftContract.waitForDeployment();
//   });
//   it('Mints a token to the signer', async () => {
//     await nftContract.mint(address);
//     const expected = address;
//     const actual = await nftContract.ownerOf(0);
//     assert.equal(actual, expected, 'owner is the signer');
//   });
//   it('Returns correct token count', async () => {
//     await nftContract.mint(address);
//     const actual = Number(await nftContract.getTokenIds());
//     const expected = 1;
//     assert.equal(actual, expected, 'returns correct supply');
//     console.log('Total supply: ', actual);
//   });
// });

describe('Registry Contract', () => {
  let nftContract;
  let registryContract;
  let erc6551Implementation;
  let address;
  let provider;
  let signer;
  let chainId;
  beforeEach(async () => {
    provider = ethers.provider;
    signer = await provider.getSigner(0);
    chainId = (await hre.ethers.provider.getNetwork()).chainId;
    nftContract = await hre.ethers.deployContract('Token');
    registryContract = await hre.ethers.deployContract('ERC6551Registry');
    erc6551Implementation = await hre.ethers.deployContract('ERC6551Account');
    nftContract.waitForDeployment();
    registryContract.waitForDeployment();
    erc6551Implementation.waitForDeployment();
  });
  it('creates a smart contract account', async () => {
    await nftContract.mint(signer.address);
    const tokenId = Number(await nftContract.getTokenIds()) - 1;
    const computedAddress = await registryContract.account(
      erc6551Implementation.target,
      chainId,
      nftContract.target,
      tokenId,
      0
    );

    const tx = await registryContract.createAccount(
      erc6551Implementation.target,
      chainId,
      nftContract.target,
      tokenId,
      0,
      '0x'
    );

    await tx.wait(1);
    assert.ok(ethers.isAddress(computedAddress));
  });
});
