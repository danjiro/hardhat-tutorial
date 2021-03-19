const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");

  console.log('Deploying Token contract');

  const token = await upgrades.deployProxy(Token, ['Danjiro token', 'DJRO', 42]);

  await token.deployed();

  console.log("Token address:", token.address);
};

main();
