const Web3 = require('web3');
require('dotenv').config();
const { getProvider } = require('./provider'); // Assuming the provider function is in provider.js

function getWallet() {
    const privateKey = process.env.ETH_PRIVATE_KEY;

    if (!privateKey) {
        throw new Error("ETH_PRIVATE_KEY is undefined");
    }

    // Create Web3 provider instance
    const web3 = getProvider();

    // Add the private key to the wallet (Web3.js accounts wallet)
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    // Add the account to the Web3 wallet (optional: store multiple accounts)
    web3.eth.accounts.wallet.add(account);

    // Return the account (which includes both address and privateKey)
    return account;
}

module.exports = { getWallet };
