require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Sprout.sol/FactoryClone.json");
const contractAddress = "0x1fa9f9C07ea2e579F505b11aDF3e78a769DB9d47";
const factory = new web3.eth.Contract(contract.abi, contractAddress);

async function plant(name, symbol) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': factory.methods.createGarden(name, symbol, "").encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      } 
    }); 
  }).catch((err) => {
    console.log(" Promise failed:", err);
  }); 

}

async function getGardens() {
  const allGardens = await factory.methods.getAllGardens().call();
  console.log(allGardens);
}

//plant("Test Two", "TWO");
getGardens();

