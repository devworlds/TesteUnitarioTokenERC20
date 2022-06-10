const { expect } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");



/*
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
}); */

describe("isDeployed", function() {
  it("Should return contract address", async function(){
    const TokenFactory = await ethers.getContractFactory("CryptoToken");
    const TokenDeploy = await TokenFactory.deploy(1);
    await TokenDeploy.deployed();

    const deployAddress = await TokenDeploy.address;
    console.log("Contract Address: " + deployAddress);
  })
});

describe("aboutSupply", function() {
  const supply = 1000;
  it("Should return totalSupply", async function(){
    const TokenFactory = await ethers.getContractFactory("CryptoToken");
    const TokenDeploy = await TokenFactory.deploy(supply);
    await TokenDeploy.deployed();

    expect(await TokenDeploy.totalSupply()).to.equal(supply);
    console.log("Total Supply: " + await TokenDeploy.totalSupply());
  })

  it("Should return owner balance equal to totalSupply", async function(){
    const [Owner] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("CryptoToken", Owner);
    const TokenDeploy = await TokenFactory.deploy(supply);
    await TokenDeploy.deployed();

    expect(await TokenDeploy.balanceOf(Owner.address)).to.equal(supply);
    console.log("Balance of Owner: " + await TokenDeploy.balanceOf(Owner.address));
  })
})

describe("isTransfer", function() {
  it("Should return value of trade in new wallet", async function(){
    const supply = 1000;
    const trade = 100;
    
    const [Owner, userWallet] = await ethers.getSigners();
  
    const TokenFactory = await ethers.getContractFactory("CryptoToken", Owner);
    const TokenDeploy = await TokenFactory.deploy(supply);
    await TokenDeploy.deployed();

    await TokenDeploy.transfer(userWallet.address, trade);

    console.log("OwnerWallet Balance: " + await TokenDeploy.balanceOf(userWallet.address));
    console.log("Wallet1 Balance: " + await TokenDeploy.balanceOf(Owner.address));
   
    expect(await TokenDeploy.balanceOf(userWallet.address)).to.equal(trade);

  })
});

