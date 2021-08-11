require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Sprout.sol/Garden.json");
const contractAddress = "0xeb6028ce7e47463c4e1c223b0723339432c3c61c";
const garden = new web3.eth.Contract(contract.abi, contractAddress);

async function mint(uri) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': garden.methods.mint(uri).encodeABI()
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

async function tokenURI(id) {
  const uri = await garden.methods.tokenURI(id).call();
  console.log("The URI is: " + uri);
}

//mint("https://nftwords.bid/api/word/1");

tokenURI(0);

