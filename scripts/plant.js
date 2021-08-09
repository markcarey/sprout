require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Sprout.sol/FactoryClone.json");
const contractAddress = "0x96333a021Ab89efa117656b35a2920e82A5567b9";
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

plant("Test Two", "TWO");

