
require('dotenv').config();
const {Web3} = require('web3'); // Correct import of Web3
const fs = require('fs');
const path = require('path');
const { task, types } = require("hardhat/config");
const { env } = require("../../lib/env");


const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

// Load the wallet (private key) for signing transactions
const privateKey = process.env.ETH_PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey); // Prepend '0x'
web3.eth.accounts.wallet.add(account);

// Read the compiled contract ABI and bytecode (replace with actual paths to your compiled contract)
const contractPath = path.resolve(__dirname, '../../artifacts/contracts/myNFT.sol/GameItem.json');
const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const { abi, bytecode } = contractData;





// Task to deploy the NFT contract using Web3.js
task("deploy-contract", "Deploy NFT contract").setAction(async () => {
  try {
    const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

    // Define the deployment module
    module.exports = buildModule("CertificateModule", (m) => {
      const certificate = m.contract("GameItem");
      return { certificate };
    });

  } catch (error) {
    console.error("Error deploying contract:", error);
  }
});

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



// module.exports = buildModule("CertificateModule", (m) => {
  

//   const certificate = m.contract("GameItem");
//   //console.log("Deployed contract address:",`${certificate.address}`);
//   return { certificate };
  

 
// });

//0x8D8756F6cCA0b852077866eeAd91E815f80D2667(ADRESS WHERE IT IS STORED ON SEPOLIA)








// Task to mint an NFT using Web3.js
task("mint-nft", "Mint an NFT")
  .addParam("tokenuri", "Your ERC721 Token URI", undefined, types.string)
  .setAction(async (taskArgs) => {
    const tokenUri = taskArgs.tokenuri;
    const contractAddress = '0x8D8756F6cCA0b852077866eeAd91E815f80D2667'; // Replace with the actual contract address
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const mintTx = contract.methods.awardItem(env("ETH_PUBLIC_KEY"), tokenUri);

      const gasEstimate = await mintTx.estimateGas({
        from: account.address,
      });

      const receipt = await mintTx.send({
        from: account.address,
        gas: gasEstimate,
      });

      console.log(`NFT minted. TX hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  });
