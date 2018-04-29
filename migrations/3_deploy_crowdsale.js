var NoxCrowdsale = artifacts.require("./NoxCrowdsale.sol");
var NoxToken = artifacts.require("./NoxToken.sol");

module.exports = function(deployer, networks, accounts) {
    const rate  = new web3.BigNumber('1');
    const wallet = accounts[1];

    deployer.deploy(
        NoxCrowdsale,
        rate,
        NoxToken.address,
        wallet
    );
};
