const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const TokenV2 = await ethers.getContractFactory("TokenV2");

  console.log('Upgrading Token contract to TokenV2');

  const token = await upgrades.upgradeProxy('0xD52ec78837706Cb502a2378A0b547cDE875d2a58', TokenV2);

  console.log("Token upgraded");
  console.log("Token address:", token.address);
};

main();
