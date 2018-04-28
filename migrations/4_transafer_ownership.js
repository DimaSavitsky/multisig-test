var NoxCrowdsale = artifacts.require("./NoxCrowdsale.sol");
var NoxToken = artifacts.require("./NoxToken.sol");

module.exports = (deployer) => deployer.then(async ()=> {
    const Token = await NoxToken.deployed();
    await Token.transferOwnership(NoxCrowdsale.address);
});

