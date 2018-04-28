var NoxToken = artifacts.require("./NoxToken.sol");

module.exports = function(deployer) {
    const cap = new web3.BigNumber('6000000');
    deployer.deploy(NoxToken, cap);
};
