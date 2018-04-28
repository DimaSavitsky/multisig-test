pragma solidity ^0.4.21;

import "./NoxToken.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";

contract NoxCrowdsale is MintedCrowdsale, CappedCrowdsale, WhitelistedCrowdsale {
    uint256 public cap;

    constructor(
        uint256 _rate,
        MintableToken _token,
        address _wallet
    ) public
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(1)
    {
        cap = NoxToken(address(token)).cap();
    }

}
