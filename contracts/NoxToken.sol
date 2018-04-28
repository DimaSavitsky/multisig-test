pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/CappedToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/PausableToken.sol';

contract NoxToken is MintableToken, CappedToken, BurnableToken, PausableToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public cap;

    constructor(uint256 _cap) public CappedToken(_cap) {
        name = "Nox Token";
        symbol = "NXT";
        decimals = 18;
        cap = _cap;
    }
}
