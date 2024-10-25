// require('dotenv').config(); // Load environment variables from .env file
// // require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-waffle");


// // Load and parse npm command arguments
// // Helper function to compare arrays by value
// function arraysEqual(a, b) {
//   if (a.length !== b.length) return false;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }



// // Import tasks (you may need to adjust the path based on your project structure)
// require("./ignition/modules/nft");

// // Export Hardhat configuration
// module.exports = {
//   solidity: "0.8.0", // Solidity compiler version
//   networks: {
//     sepolia: {
//       url: `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, // Alchemy API key for Sepolia network
//       accounts: [process.env.ETH_PRIVATE_KEY], // Your Ethereum private key
//     },
//   },
// };

require("@nomicfoundation/hardhat-toolbox"); // Optional, if you're using any Hardhat functionalities

// Check if npm_config_argv is defined before parsing
const argv = process.env.npm_config_argv ? JSON.parse(process.env.npm_config_argv) : { original: [] };
if (argv.original.includes("hardhat") && argv.original.includes("test")) {
  // Do nothing or handle accordingly if running tests
} else {
  require('dotenv').config();
}


require("./ignition/modules/nft");


module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.ETH_PRIVATE_KEY}`],
    },
  },
};
