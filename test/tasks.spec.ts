// const {Web3} = require("web3");
// const { expect } = require("chai");
// const sinon = require("sinon");
// const { deployTestContract, getTestWallet } = require("./test-helpers");

// describe("tasks", () => {
//   let web3;
//   let wallet;

//   before(async () => {
//     // Initialize Web3 instance
//     web3 = new Web3("http://localhost:8545"); // Change to your local Ethereum node URL
//   });

//   beforeEach(async () => {
//     sinon.stub(global, "getProvider").returns(web3);
//     wallet = getTestWallet();
//     sinon.stub(process, "env").value({
//       ETH_PUBLIC_KEY: wallet.address,
//       ETH_PRIVATE_KEY: wallet.privateKey,
//     });
//   });

//   describe("deploy-contract", () => {
//     it("calls through and returns the transaction object", async () => {
//       sinon.stub(process.stdout, "write");

//       const deployedContract = await deployTestContract("MyNFT", web3, wallet);
//       const transactionHash = deployedContract.transactionHash;

//       // Simulate writing the contract address
//       await process.stdout.write(`Contract address: ${deployedContract.options.address}\n`);

//       await expect(process.stdout.write).to.have.been.calledWith(
//         `Contract address: ${deployedContract.options.address}\n`
//       );
//     });
//   });

//   describe("mint-nft", () => {
//     let deployedContract;

//     beforeEach(async () => {
//       deployedContract = await deployTestContract("MyNFT", web3, wallet);
//       process.env.NFT_CONTRACT_ADDRESS = deployedContract.options.address;
//     });

//     it("calls through and returns the transaction object", async () => {
//       sinon.stub(process.stdout, "write");

//       const tokenUri = "https://example.com/record/4";
//       const receipt = await deployedContract.methods.awardItem(wallet.address, tokenUri).send({ from: wallet.address });

//       // Simulate writing the transaction hash
//       await process.stdout.write(`TX hash: ${receipt.transactionHash}\n`);

//       await expect(process.stdout.write).to.have.been.calledWith(
//         `TX hash: ${receipt.transactionHash}\n`
//       );
//     });
//   });

//   afterEach(() => {
//     sinon.restore();
//   });
// });

import { deployTestContract, getTestWallet } from "./test-helpers";
import { waffle, run } from "hardhat";
import { expect } from "chai";
import sinon from "sinon";
import * as provider from "../lib/provider";

describe("tasks", () => {
  beforeEach(async () => {
    sinon.stub(provider, "getProvider").returns(waffle.provider);
    const wallet = getTestWallet();
    sinon.stub(process, "env").value({
      ETH_PUBLIC_KEY: wallet.address,
      ETH_PRIVATE_KEY: wallet.privateKey,
    });
  });

  describe("deploy-contract", () => {
    it("calls through and returns the transaction object", async () => {
      sinon.stub(process.stdout, "write");

      await run("deploy-contract");

      await expect(process.stdout.write).to.have.been.calledWith(
        "Contract address: 0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
      );
    });
  });

  describe("mint-nft", () => {
    beforeEach(async () => {
      const deployedContract = await deployTestContract("myNFT");
      process.env.NFT_CONTRACT_ADDRESS = deployedContract.address;
    });

    it("calls through and returns the transaction object", async () => {
      sinon.stub(process.stdout, "write");

      await run("mint-nft", { tokenUri: "https://example.com/record/4" });

      await expect(process.stdout.write).to.have.been.calledWith(
        "TX hash: 0xd1e60d34f92b18796080a7fcbcd8c2b2c009687daec12f8bb325ded6a81f5eed"
      );
    });
  });
});