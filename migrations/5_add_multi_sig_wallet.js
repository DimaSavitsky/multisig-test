var MultiSigWallet = artifacts.require("./MultiSigWallet.sol");

module.exports = function(deployer, networks, accounts) {
    deployer.deploy(
        MultiSigWallet,
        accounts.slice(3,6),
        2
    );
};
