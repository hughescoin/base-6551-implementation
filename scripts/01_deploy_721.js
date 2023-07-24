const hre = require('hardhat');
const wallet2 = '0x9eEd71442F60440b39Def927047e5823c0b208D4';

async function deployERC721() {
  const NftContract = await hre.ethers.deployContract('FocusFoxes');
  await NftContract.waitForDeployment();
  console.log(`Contract deployed at: ${NftContract.target}`);
  console.log('Minting Fox NFT...');
  await NftContract.createSupply(wallet2);
  const owner = await NftContract.ownerOf(0);
  console.log(owner);
}

deployERC721().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
