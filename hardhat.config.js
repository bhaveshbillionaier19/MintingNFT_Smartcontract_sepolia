
require("@nomicfoundation/hardhat-toolbox"); 
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
