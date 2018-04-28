var NoxCrowdsale = artifacts.require("./NoxCrowdsale.sol");
var NoxToken = artifacts.require("./NoxToken.sol");

module.exports = function(deployer, networks, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp;
    const closingTime = openingTime + 60 * 60 * 24 * 31;
    const rate  = new web3.BigNumber('1000');
    const wallet = accounts[1];

    deployer.deploy(
        NoxCrowdsale,
        rate,
        NoxToken.address,
        wallet
    );
};
