const { expect } = require('chai');

describe('Token', () => {
  it('should assign the total supply to contract owner on deployment', async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('Token');
    const hardHatToken = await Token.deploy();
    const ownerBalance = await hardHatToken.balanceOf(owner.address);

    expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
  });
});
