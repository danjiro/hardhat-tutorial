const { expect } = require('chai');

describe('Token contract', () => {
  let Token;
  let hardHatToken;
  let owner;
  let address1;
  let address2;
  let addresses;

  beforeEach(async () => {
    Token = await ethers.getContractFactory('Token');
    [owner, address1, address2, addresses] = await ethers.getSigners();
    hardHatToken = await Token.deploy();
  });

  describe('Deployment', () => {
    it('should set the right owner', async () => {
      expect(await hardHatToken.owner()).to.equal(owner.address);
    });

    it('should assign the total supply to contract owner', async () => {
      const ownerBalance = await hardHatToken.balanceOf(owner.address);

      expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', () => {
    it('should transfer tokens between accounts', async () => {
      await hardHatToken.transfer(address1.address, 10);
      expect(await hardHatToken.balanceOf(address1.address)).to.equal(10);

      await hardHatToken.connect(address1).transfer(address2.address, 5);
      expect(await hardHatToken.balanceOf(address2.address)).to.equal(5);
      expect(await hardHatToken.balanceOf(address1.address)).to.equal(5);
    });

    it('should fail if sender does not have enough tokens', async () => {
      const initialOwnerBalance = await hardHatToken.balanceOf(owner.address);

      await expect(hardHatToken.connect(address1).transfer(owner.address, 1)).to.be.revertedWith('Not enough tokens');
      expect(await hardHatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it('should update balances after transfers', async () => {
      const initialOwnerBalance = await hardHatToken.balanceOf(owner.address);

      await hardHatToken.transfer(address1.address, 69);
      await hardHatToken.transfer(address2.address, 420);

      expect(await hardHatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance - 69 - 420);
      expect(await hardHatToken.balanceOf(address1.address)).to.equal(69);
      expect(await hardHatToken.balanceOf(address2.address)).to.equal(420);
    });
  })
});
