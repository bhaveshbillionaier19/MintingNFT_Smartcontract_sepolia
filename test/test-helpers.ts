// const Web3 = require("web3").default;
// const chai = require("chai");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");

// const web3 = new Web3("http://localhost:8545"); // Change to your local Ethereum node URL

// chai.use(sinonChai);

// afterEach(() => {
//   sinon.restore();
// });

// function deployTestContract(name) {
//   return web3.eth.getAccounts().then(async accounts => {
//     const wallet = accounts[0]; // Get the first account as the test wallet

//     // Load the contract ABI and bytecode
//     const { abi, evm } = require(`./build/contracts/${name}.json`); // Adjust the path as needed

//     const contract = new web3.eth.Contract(abi);

//     // Deploy the contract
//     const deployedContract = await contract
//       .deploy({ data: evm.bytecode.object })
//       .send({ from: wallet, gas: 1500000, gasPrice: '30000000000' }); // Set appropriate gas limit and gas price

//     return deployedContract;
//   });
// }

// function getTestWallet() {
//   return web3.eth.getAccounts().then(accounts => accounts[0]); // Return the first account as the test wallet
// }

// module.exports = {
//   deployTestContract,
//   getTestWallet,
// };
// Note this require the NPM libraries imported, including sinon, chai, and sinon-chai. 
// The sinon.restore() call is necessary due to the use of stubbing.
import sinon from "sinon";
import chai from "chai";
import sinonChai from "sinon-chai";
import { ethers as hardhatEthers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});

export function deployTestContract(name: string): Promise<Contract> {
  return hardhatEthers
    .getContractFactory(name, getTestWallet())
    .then((contractFactory) => contractFactory.deploy());
}

export function getTestWallet(): Wallet {
  return waffle.provider.getWallets()[0];
}