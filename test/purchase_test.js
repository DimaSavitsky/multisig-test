var NoxCrowdsale = artifacts.require("./NoxCrowdsale.sol");
var NoxToken = artifacts.require("./NoxToken.sol");
var MultiSigWallet = artifacts.require("./MultiSigWallet.sol");

contract('Test multisig purchase', (accounts) => {
    it('owner should buy tokens', async () => {
        const crowdsale = await NoxCrowdsale.deployed();
        const token = await NoxToken.deployed();
        const amount = web3.toWei(1, 'Ether');
        const owner = await crowdsale.owner();
        const buyerAddress = accounts[1];

        //// Whitelist an account by Crowdsale Owner
        await crowdsale.addToWhitelist(buyerAddress, { from: owner });
        crowdsale.buyTokens(buyerAddress, { value: amount, from: buyerAddress });

        //// assert account has a correct number of tokens
        const rate = await crowdsale.rate();
        const balance = (await token.balanceOf(buyerAddress)).toNumber();
        assert.equal(balance, rate * amount);
    });

    it('should buy tokens', async () => {
        const crowdsale = await NoxCrowdsale.deployed();
        const token = await NoxToken.deployed();
        const wallet = await MultiSigWallet.deployed();
        const amount = web3.toWei(1, 'Ether');

        //// Whitelist MultiSig by Crowdsale Owner
        await crowdsale.addToWhitelist(wallet.address, { from: accounts[0] });

        //// Put Eth to MultiSig
        const owner = await wallet.owners(0);
        //// To call fallback function
        await web3.eth.sendTransaction({ to: wallet.address, value:  web3.toWei(5, 'Ether'), from: owner });
        //// To check wallet balance
        console.log("Wallet balance: " + web3.eth.getBalance(wallet.address));

        //// Create transaction request from multisig
        const purchaseData = crowdsale.contract.buyTokens.getData(owner);
        await wallet.submitTransaction(wallet.address, amount, purchaseData, {from: owner});

        //// Look at token transaction by the second account
        const secondOwner = await wallet.owners(1);
        const transactionCount = (await wallet.transactionCount()).toNumber();

        const includePending = true;
        const excludeExecuted = false;
        const lastTransactionId = (await wallet.getTransactionIds(0, transactionCount, includePending, excludeExecuted))[0].toNumber();

        //// Authorize the transaction
        await wallet.confirmTransaction(lastTransactionId, { from: secondOwner });
        // await wallet.executeTransaction(lastTransactionId, { from: secondOwner }); - happens on the last confirm

        //// assert MultiSig has a correct number of tokens
        const rate = await crowdsale.rate();
        const balance = (await token.balanceOf(owner)).toNumber();
        assert.equal(balance, rate * amount);
    })
});
