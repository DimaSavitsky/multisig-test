var NoxToken = artifacts.require("./NoxToken.sol");

module.exports = function(deployer) {
    const cap = new web3.BigNumber(web3.toWei(100, 'Ether'));
    deployer.deploy(NoxToken, cap);
};
