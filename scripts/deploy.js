async function main() {
    const Sprout = await ethers.getContractFactory("FactoryClone");
    
    // Start deployment, returning a promise that resolves to a contract object
    const mySprout = await Sprout.deploy();
    console.log("Contract deployed to address:", mySprout.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });