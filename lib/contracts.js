require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Function to get the Web3.js contract instance
function getContract() {
  // Get the provider and wallet
  const web3 = new Web3(`https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`);
  
  // Load the private key to sign transactions
  const privateKey = process.env.ETH_PRIVATE_KEY;
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  
  // Path to the contract's compiled ABI (replace with actual path)
  const contractPath = path.resolve(__dirname, '../artifacts/contracts/MyNFT.json');
  const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

  // Get the contract ABI and address from environment variables
  const abi = contractData.abi;
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

  // Return the contract instance connected to the specified address
  return new web3.eth.Contract(abi, contractAddress, { from: account.address });
}

module.exports = { getContract };
