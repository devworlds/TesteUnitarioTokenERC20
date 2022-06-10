# TesteUnitarioTokenERC20
 
 
 
 
<h1>xercicio para escrever os testes do nosso Token ERC20 em localhost.<h1>


<h2>Testes Feitos<h2>

 
<h3>- Teste de Deploy -<h3>
```
describe("isDeployed", function() {
  it("Should return contract address", async function(){
    const TokenFactory = await ethers.getContractFactory("CryptoToken");
    const TokenDeploy = await TokenFactory.deploy(1);
    await TokenDeploy.deployed();

    const deployAddress = await TokenDeploy.address;
    console.log("Contract Address: " + deployAddress);
  })
});
``` 


<h3>- Testes de Supply -<h3>
``` 
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
```
 
<h3>- Teste de Transfer -<h3>
``` 
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
```
