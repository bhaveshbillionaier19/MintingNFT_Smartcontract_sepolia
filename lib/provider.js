const Web3 = require('web3');
require('dotenv').config();

function getProvider() {
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;
    if (!alchemyApiKey) {
        throw new Error("ALCHEMY_API_KEY is undefined");
    }

    // Connect to the Alchemy provider using Web3.js
    const providerUrl = `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`;
    return new Web3(providerUrl);
}

module.exports = { getProvider };
