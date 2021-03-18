const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const TokenV2 = await ethers.getContractFactory("TokenV2");

  console.log('Upgrading Token contract to TokenV2');

  const token = await upgrades.upgradeProxy('0x0165878a594ca255338adfa4d48449f69242eb8f', TokenV2);

  console.log("Token upgraded");
  console.log("Token address:", token.address);
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });