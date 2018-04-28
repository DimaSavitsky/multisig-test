var NoxCrowdsale = artifacts.require("./NoxCrowdsale.sol");
var NoxToken = artifacts.require("./NoxToken.sol");

contract('Test purchase', (accounts) => {

    it('should buy tokens', async () => {
        const crowdsale = await NoxCrowdsale.deployed();
        const token = await NoxToken.deployed();
        const account = accounts[2];
        const amount = web3.toWei(1, 'Ether');

        await crowdsale.buyTokens(account, { from: account, value: amount});
        const rate = await crowdsale.rate();
        const balance = (await token.balanceOf(account)).toNumber();
        assert.equal(balance, rate * amount);
    })
});
