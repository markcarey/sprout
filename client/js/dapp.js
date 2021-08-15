    function abbrAddress(address){
        if (!address) {
            address = ethereum.selectedAddress;
        }
        return "0x..." + address.slice(address.length - 6);
    }

  var web3;
  const network = "mumbai";
  if (network == "mumbai") {
    web3 = AlchemyWeb3.createAlchemyWeb3("wss://polygon-mumbai.g.alchemy.com/v2/sDA8ZaKnUGk1Vt7wSvwn0J6t5fVYtN0T");
  } else {
    web3 = AlchemyWeb3.createAlchemyWeb3("wss://polygon-mainnet.g.alchemy.com/v2/zdeZwAwHBiBZzLtxdWtShZzuAjBPjoUW");
  }

  var BN = web3.utils.BN;
  var accounts;
  var gardenAddress;
  var ipfsImageURL = "";

  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "GardenCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_follower",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        }
      ],
      "name": "GardenFollowed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_liker",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "PlantLiked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allGardens",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimable",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "baseTokenURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contractURI",
          "type": "string"
        }
      ],
      "name": "createGarden",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "gardenAddress",
          "type": "address"
        }
      ],
      "name": "follow",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllGardens",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getFollowsForUser",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getGardensForUser",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "gardenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "like",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const contractAddress = "0xc7d8Feb124F107F95839CC4027A1b52bB717f255";
  const factory = new web3.eth.Contract(contractABI, contractAddress);

  const gardenABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINTER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PAUSER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRoleMember",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleMemberCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "baseTokenURI",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "contractURI",
          "type": "string"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  var garden;
  var gardenName = "";
  var dappChain;
  var userChain;
  var gardenJson;

  var gas = web3.utils.toHex(new BN('1000000000')); // 1 Gwei;

  async function main() {
      dappChain = await web3.eth.getChainId();
      console.log("The chainId is " + dappChain);

      accounts = await web3.eth.getAccounts();
      connectWallet();

      userChain = await ethereum.request({ method: 'eth_chainId' });
      console.log("The chainId of connected account is " + web3.utils.hexToNumber(userChain));

      window.ethereum.on('accountsChanged', function () {
          web3.eth.getAccounts(function (error, accts) {
              console.log(accts[0], 'current account after account change');
              accounts = accts;
              location.reload();
          });
      });

      window.ethereum.on('chainChanged', function () {
        location.reload();
      });
  }
  main();

  function correctChain() {
    var correct = false;
    if (dappChain == userChain) {
      correct = true;
    }
    return correct;
  }
      

  async function connectWallet() {
      $("#status").text("Connecting...");
      M.toast({html: '🌱 Connecting...'});
      if (window.ethereum) {
          console.log("window.ethereum true");
          window.ethereum
              .enable()
              .then(async result => {
                  // Metamask is ready to go!
                  console.log(result);
                  accounts = result;
                  $(".connect").text(abbrAddress());
                  //if ( mode == "admin" ) {
                    $("#index-banner").hide();
                    $("#about").hide();
                    var gardens = await factory.methods.getGardensForUser(accounts[0]).call();
                    console.log(gardens);
                    console.log(gardens.length);
                    if ( gardens.length > 0 ) {
                        gardenAddress = gardens[gardens.length - 1];
                        garden = new web3.eth.Contract(gardenABI, gardenAddress);
                        if ( mode == "admin" ) {
                            loadPosts();
                        }
                        $("#minter").show();
                        $("#minter").removeClass("hide");
                        updateBalance();
                        gardenName = await garden.methods.name().call();
                        console.log(gardenName);
                        $("#garden-name").text(gardenName).append('<div class="row center"><button data-address="' + gardenAddress + '" class="follow btn waves-effect waves-light">Follow</button></div>');
                        const gardenContractURI = await garden.methods.contractURI().call();
                        console.log(gardenContractURI);
                        if ( gardenContractURI ) {
                            const response = await fetch(gardenContractURI);
                            gardenJson = await response.json();
                            console.log(gardenJson);
                        }
                    } else {
                        $("#planter").removeClass("hide");
                    }
                    $("#status").text("Connected as " + abbrAddress());

                  //} else {
                  if ( mode == "twitter" || mode == "medium") {
                    let params = (new URL(document.location)).searchParams;
                    let indie = params.get("plant");
                    if ( indie ) {
                        loadPlant(indie);
                    } else {
                        var following = await factory.methods.getFollowsForUser(accounts[0]).call();
                        if ( following.length > 0 ) {
                            loadPlants(following.join(':'));
                        }
                        loadPlants();
                    }
                  }
                  killToast();
                  M.toast({html: "🌱 Connected as " + abbrAddress()});
              })
              .catch(reason => {
                  // Handle error. Likely the user rejected the login.
              });
      } else {
          // The user doesn't have Metamask installed.
          console.log("window.ethereum false");
      }
      
  }

async function updateBalance() {
var farmed = await factory.methods.claimable().call({'from': ethereum.selectedAddress});
var canClaim = web3.utils.fromWei( farmed.toString() );
$(".claim-amount").text(canClaim);
}

async function createGarden(name, symbol, desc, link) {

  if ( !(correctChain()) ) {
    M.toast({html: '🌱 Change networks first!!'});
    return false;
  }

  gardenJson = {
    "name": name,
    "description": desc,
    "image": ipfsImageURL,
    "external_link": link,
    "seller_fee_basis_points": 500,
    "fee_recipient": ethereum.selectedAddress
  };
  M.toast({html: '🌱 Saving Garden metadata to IPFS...', displayLength: 60000});

  const blob = new Blob([JSON.stringify(gardenJson)], { type: 'application/json' });
  const file = new File([ blob ], 'garden.json');
  const response = await fetch('https://api.nft.storage/upload', { 
      method: 'post', 
      headers: new Headers({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NkZiYmNhOEIzZDIwMDAzZTA2ZjMzZmRBN0E0NzUxMGExRUY5OTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODYxMDE3NzQxNSwibmFtZSI6InNwcm91dCBtZXRhZGF0YSJ9.6YwPqstbUyRfNiGwEaYccfGZZYGmXOSuAuLzLduwdRM', 
          'Content-Type': 'application/json'
      }), 
      body: file
  });
  var result = await response.json();
  console.log( result );
  var gardenMetadataUri = "";
  if (result.ok) {
      killToast();
      M.toast({html: '🌱 Saved Garden metadata to IPFS'});
      gardenMetadataUri = "https://" + result.value.cid + ".ipfs.dweb.link/";
  }

  const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

  //the transaction
  const tx = {
      'from': ethereum.selectedAddress,
      'to': contractAddress,
      'gasPrice': gas,
      'value': web3.utils.toHex(new BN('100000000000000000')),
      'nonce': "" + nonce,
      'data': factory.methods.createGarden(name, symbol, "", gardenMetadataUri).encodeABI()
  };
  console.log(tx);

  $("#status").text("Waiting for transaction...");
  M.toast({html: '🌱 Waiting for transaction...', displayLength: 60000});

  const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
  });


  if (txHash) {
      console.log("The hash of your transaction is: ", txHash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      
      var txn = await web3.eth.getTransaction(txHash);
      console.log(txn);
      var all = await factory.methods.getAllGardens().call();
      console.log(all);
      var user = await factory.methods.getGardensForUser(accounts[0]).call();
      console.log(user);

      var pendingTxHash = txHash;
      web3.eth.subscribe('newBlockHeaders', async (error, event) => {
          if (error) {
              console.log("error", error);
          }
          console.log("event", event);
          const blockTxHashes = (await web3.eth.getBlock(event.hash)).transactions;

          if (blockTxHashes.includes(pendingTxHash)) {
              web3.eth.clearSubscriptions();
              $("#planter").addClass("hide");
              $("#minter").removeClass("hide");
              $("#status").text("Garden created.");
              killToast();
              M.toast({html: '🌱 Garden created'});
              console.log('confirmed!');
              console.log(await web3.eth.getTransactionReceipt(pendingTxHash));
              var all = await factory.methods.getAllGardens().call();
              console.log(all);
              var user = await factory.methods.getGardensForUser(accounts[0]).call();
              console.log(user);
              gardenAddress = user[user.length - 1];
              console.log("The new contract is at " + gardenAddress);
              $("#status").text("Garden created at " + gardenAddress);
              killToast();
              M.toast({html: '🌱 Garden created at ' + gardenAddress});
              garden = new web3.eth.Contract(gardenABI, gardenAddress);
              $("#garden-name").text(name);
          }
      });
  } else {
      console.log("Something went wrong when submitting your transaction:");
  } 

}

function ipfsToHttp(ipfs) {
  var http = "";
  var cid = ipfs.replace("ipfs://", "");
  http = "https://" + cid + ".ipfs.dweb.link";
  return http;
}

function nl2br (str, is_xhtml) {
  if (typeof str === 'undefined' || str === null) {
      return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function getPlantData(metadata) {
    const sprout = metadata.description;
    var title = "";
    if (metadata.name) {
        title = metadata.name;
    }
    var plant = "";
    if ( metadata.attributes && metadata.attributes.length > 0 ) {
        plant = metadata.attributes[0].value;
        var converter = new showdown.Converter();
        plant = converter.makeHtml(plant);
    }
    var image = metadata.image;
    var tokenId = metadata.tokenId;
    var author = abbrAddress(metadata.address);
    var address = metadata.address;
    var date = moment.utc(metadata.date, "X").format("D MMMM YYYY");
    var gardenName = "";
    var gardenDesc = "";
    var authorUrl = "/";
    var authorImage = "https://www.gravatar.com/avatar/?d=mp";
    if ( "garden" in metadata ) {
        gardenName = metadata.garden.name;
        gardenDesc = metadata.garden.description;
        authorUrl = metadata.garden.external_link;
        authorImage = metadata.garden.image;
    }
    var data = {
        "sprout": sprout,
        "title": title,
        "plant": plant,
        "image": image,
        "tokenId": tokenId,
        "author": author,
        "address": address,
        "date": date,
        "gardenName": gardenName,
        "gardenDesc": gardenDesc,
        "authorUrl": authorUrl,
        "authorImage": authorImage
    }
    return data;
}

function getTweetHTML(metadata) {
    var m = getPlantData(metadata);
    var postHTML = `
    <!-- post starts -->
      <div class="post">
        <div class="post__avatar">
          <img
            src="${m.authorImage}"
            alt="${m.author}"
          />
        </div>

        <div class="post__body">
          <div class="post__header">
            <div class="post__headerText">
              <h3>
                ${m.gardenName}
                <span class="post__headerSpecial"
                  ><span class="material-icons post__badge"> verified </span>@${m.author}</span
                >
              </h3>
            </div>
            <div class="post__headerDescription">
              <p>${m.sprout}</p>
            </div>
          </div>
          <img
            src="${m.image}"
            alt=""
          />
          <div class="post__footer">
            <span class="material-icons"> repeat </span>
            <span class="material-icons like" data-address="${m.address}" data-tokenId="${m.tokenId}" style="cursor: pointer;"> favorite_border </span>
            <span class="material-icons"> publish </span>
          </div>
        </div>
      </div>
      <!-- post ends -->`;
    return postHTML;
}

function getPlantHTML(metadata) {
  var m = getPlantData(metadata);
  var postHTML = `
  <!-- begin post -->
		<div class="card">
			<div class="row">
				<div class="col-md-5 wrapthumbnail">
					<a href="post.html?plant=${m.address}:${m.tokenId}">
						<div class="thumbnail" style="background-image:url( ${m.image} );">
						</div>
					</a>
				</div>
				<div class="col-md-7">
					<div class="card-block">
						<h2 class="card-title"><a href="post.html?plant=${m.address}:${m.tokenId}">${m.title}</a></h2>
						<h4 class="card-text">${m.sprout}</h4>
						<div class="metafooter">
							<div class="wrapfooter">
								<span class="meta-footer-thumb">
								<a href="${m.authorUrl}"><img class="author-thumb" src="${m.authorImage}" alt="${m.gardenName}"></a>
								</span>
								<span class="author-meta">
								<span class="post-name"><a href="${m.authorUrl}">${m.gardenName}</a></span><br/>
								<span class="post-date">${m.date}</span><span class="dot"></span><span class="post-read">1 min read</span>
								</span>
								<span class="post-read-more"><a href="post.html?plant=${m.address}:${m.tokenId}" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end post -->`;
  return postHTML;
}

function getPlantHTMLAll(metadata) {
    var m = getPlantData(metadata);
    var postHTML = `
    <!-- begin post -->
		<div class="card">
			<a href="post.html?plant=${m.address}:${m.tokenId}">
				<img class="img-fluid" src="${m.image}" alt="">
			</a>
			<div class="card-block">
				<h2 class="card-title"><a href="post.html?plant=${m.address}:${m.tokenId}">${m.title}</a></h2>
				<h4 class="card-text">${m.sprout}</h4>
				<div class="metafooter">
					<div class="wrapfooter">
						<span class="meta-footer-thumb">
						<a href="${m.authorUrl}"><img class="author-thumb" src="${m.authorImage}" alt="${m.gardenName}"></a>
						</span>
						<span class="author-meta">
						<span class="post-name"><a href="${m.authorUrl}">${m.gardenName}</a></span><br/>
						<span class="post-date">${m.date}</span><span class="dot"></span><span class="post-read">1 min read</span>
						</span>
						<span class="post-read-more"><a href="post.html?plant=${m.address}:${m.tokenId}" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a></span>
					</div>
				</div>
			</div>
		</div>
		<!-- end post -->`;
    return postHTML;
}

function getFullPlantHTML(metadata) {
    var m = getPlantData(metadata);
    var postHTML = `
        <div class="mainheading">

            <!-- Begin Top Meta -->
            <div class="row post-top-meta">
                <div class="col-md-2">
                    <a href="${m.authorUrl}"><img class="author-thumb" src="${m.authorImage}" alt="${m.gardenName}"></a>
                </div>
                <div class="col-md-10">
                    <a class="link-dark" href="#">${m.gardenName}</a><a href="${m.authorUrl}" data-address="${m.address}" class="btn follow">Follow</a>
                    <span class="author-description">${m.gardenDesc}</span>
                    <span class="post-date">${m.date}</span><span class="dot"></span><span class="post-read">1 min read</span>
                </div>
            </div>
            <!-- End Top Menta -->

            <h1 class="posttitle">${m.title}</h1>

        </div>

        <!-- Begin Featured Image -->
        <img class="featured-image img-fluid" src="${m.image}" alt="">
        <!-- End Featured Image -->

        <!-- Begin Post Content -->
        <div class="article-post">
            ${m.plant}
        </div>
        <!-- End Post Content -->`;
    return postHTML;
}
  
    

function getPostHTML(metadata) {
    var m = getPlantData(metadata);
    var postHTML = `
    <div class="card post small sticky-action">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${m.image}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${m.sprout}<i class="material-icons right tooltipped" data-position="bottom" data-tooltip="Read More">more_vert</i></span>
      </div>
      <div class="card-action">
          <a class="like" href="#">Like</a> <a class="Sell" href="#">Sell</a>
        </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${m.title}<i class="material-icons right">close</i></span>
        <p>${m.plant}</p>
      </div>
    </div>`;
    return postHTML;
  }

async function loadPlants(address) {
    var sproutAPI = 'https://api.sprout.gdn';
    var $section;
    if (address) {
        sproutAPI = 'https://api.sprout.gdn/?following=' + address; 
        $section = $("#plants");
    } else {
        $section = $("#firehose");
    }
    const response = await fetch(sproutAPI);
    var sproutsJson = await response.json();
    if ( sproutsJson.status == "ok" ) {
        var sprouts = sproutsJson.items;
        $.each(sprouts, function(index, sprout) {
            console.log(sprout);
            var plantHTML;
            if ( mode == "medium" ) {
                if (address) {
                    plantHTML = getPlantHTML(sprout);
                } else {
                    plantHTML = getPlantHTMLAll(sprout);
                }
            } else {
                plantHTML = getTweetHTML(sprout);
            }
            var $plant = $(plantHTML).attr("id", sprout.address + "-" + sprout.tokenId).data("address", sprout.address).data("token", sprout.tokenId);
            $section.append($plant);
        });
    }
}

async function loadPlant(plant) {
    const sproutAPI = 'https://api.sprout.gdn/?plant=' + plant;
    const response = await fetch(sproutAPI);
    var sproutResp = await response.json();
    console.log(sproutResp);
    if ( sproutResp.status == "ok" ) {
        var sprout = sproutResp.plant;
        var plantHTML = getFullPlantHTML(sprout);
        var $plant = $(plantHTML);
        $("#full-plant").html($plant).attr("id", sprout.address + "-" + sprout.tokenId).data("address", sprout.address).data("token", sprout.tokenId);
    }
}

async function loadPosts(address) {
  //var total = await garden.methods.totalSupply().call();
  //console.log(total);
  if (!address) {
    address = gardenAddress;
  }
  const covTokensURI = 'https://api.covalenthq.com/v1/80001/tokens/' + address + '/nft_token_ids/?&key=ckey_ac7c55f53e19476b85f0a1099af';
  const response = await fetch(covTokensURI);
  var covTokens = await response.json();
  console.log(covTokens);
  if (covTokens.data.items.length > 0) {
    $("#planter").addClass("hide");
    $("#fab").removeClass("hide");
    $.each( covTokens.data.items, async function(index, item) {
        $("#minter").addClass("hide");
        var tokenId = item.token_id;
        var $temp = $("<div></div>").attr("id", address + "-" + tokenId);
        $("#posts").prepend($temp);
    
    //for (let i = 0; i < total; i++) {
        //var tokenId = await garden.methods.tokenByIndex(i).call();
        console.log(tokenId);
        //var tokenUri = await garden.methods.tokenURI(tokenId).call();
        //console.log(tokenUri);
        //tokenUri = ipfsToHttp(tokenUri);
        //console.log(tokenUri);
        var covURI = 'https://api.covalenthq.com/v1/80001/tokens/' + address + '/nft_metadata/' + tokenId + '/?&key=ckey_ac7c55f53e19476b85f0a1099af';
        const response = await fetch(covURI);
        var covResp = await response.json();
        console.log(covResp);
        var result = covResp.data.items[0].nft_data[0].external_data;
        var postHTML = getPostHTML(result);
        var $post = $(postHTML).attr("id", address + "-" + tokenId).data("address", address).data("token", tokenId);
        //$("#posts").prepend($post);
        $("#" + address + "-" + tokenId).replaceWith($post);
    }); // $.each
  } // if items.length
}

async function follow(address) {
  if ( accounts.length < 1 ) {
      connectWallet();
  } else {
    if ( !(correctChain()) ) {
      M.toast({html: '🌱 Change networks first!!'});
      return false;
    }
      const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

      //the transaction
      const tx = {
          'from': ethereum.selectedAddress,
          'to': contractAddress,
          'gasPrice': gas,
          'value': web3.utils.toHex(new BN('100000000000000000')),
          'nonce': "" + nonce,
          'data': factory.methods.follow(address).encodeABI()
      };
      console.log(tx);

      $("#status").text("Waiting for follow transaction...");
      M.toast({html: '🌱 Waiting for Follow transaction...', displayLength: 600000});

      const txHash = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
      });
      console.log(txHash);
      var pendingTxHash = txHash;
      web3.eth.subscribe('newBlockHeaders', async (error, event) => {
        if (error) {
            console.log("error", error);
        }
        const blockTxHashes = (await web3.eth.getBlock(event.hash)).transactions;

        if (blockTxHashes.includes(pendingTxHash)) {
            web3.eth.clearSubscriptions();
            killToast();
            M.toast({html: '🌱 Followed!'});
            $("button[data-address='" + address + "']").text("Followed");
            $("a[data-address='" + address + "']").text("Followed");
            updateBalance();
        }
      });
  }
}

async function like(address, tokenId) {
  if ( accounts.length < 1 ) {
      connectWallet();
  } else {
    if ( !(correctChain()) ) {
      M.toast({html: '🌱 Change networks first!!'});
      return false;
    }
      const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

      //the transaction
      const tx = {
          'from': ethereum.selectedAddress,
          'to': contractAddress,
          'gasPrice': gas,
          'value': web3.utils.toHex(new BN('10000000000000000')),
          'nonce': "" + nonce,
          'data': factory.methods.like(address, tokenId).encodeABI()
      };
      console.log(tx);

      $("#status").text("Waiting for Like transaction...");
      M.toast({html: '🌱 Waiting for Like transaction...', displayLength: 60000});

      const txHash = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
      });
      console.log(txHash);
      var pendingTxHash = txHash;
      web3.eth.subscribe('newBlockHeaders', async (error, event) => {
        if (error) {
            console.log("error", error);
        }
        const blockTxHashes = (await web3.eth.getBlock(event.hash)).transactions;

        if (blockTxHashes.includes(pendingTxHash)) {
            web3.eth.clearSubscriptions();
            killToast();
            M.toast({html: '🌱 Liked!'});
            if ( mode == "twitter") {
                $("#" + address + "-" + tokenId).find(".like").text("favorite");
            } else {
                $("#" + address + "-" + tokenId).find(".like").text("Liked");
            }
            updateBalance();
        }
      });
  }
}

async function claim() {
if ( !(correctChain()) ) {
  M.toast({html: '🌱 Change networks first!!'});
  return false;
}
  const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

  //the transaction
  const tx = {
      'from': ethereum.selectedAddress,
      'to': contractAddress,
      'gasPrice': gas,
      'nonce': "" + nonce,
      'data': factory.methods.withdraw().encodeABI()
  };
  console.log(tx);

  $("#status").text("Waiting for claim transaction...");
  M.toast({html: '🌱 Waiting for the Claim transaction...', displayLength: 60000});

  const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
  });
  console.log(txHash);
  var pendingTxHash = txHash;
  web3.eth.subscribe('newBlockHeaders', async (error, event) => {
    if (error) {
        console.log("error", error);
    }
    const blockTxHashes = (await web3.eth.getBlock(event.hash)).transactions;

    if (blockTxHashes.includes(pendingTxHash)) {
        web3.eth.clearSubscriptions();
        killToast();
        M.toast({html: '🌱 Claim successful'});
        $(".claim-amount").text("0");
    }
  });
  
}

function killToast(){
var toastElement = document.querySelector('.toast');
if ( toastElement ) {
  var toastInstance = M.Toast.getInstance(toastElement);
  toastInstance.dismiss();
}
}

  $( document ).ready(function() {

    $('textarea#sprout').characterCounter();
    $('.tooltipped').tooltip();
    $('.sidenav').sidenav();

      $(".connect").click(function(){
          connectWallet();
          return false;
      });

      $('#network').attr("data-badge-caption", network);

      $("#fab").click(function(){
        if ( $(this).find("i").text() == "add") {
          $("#minter").removeClass("hide");
          $(this).find("i").text("close");
        } else {
          $("#minter").addClass("hide");
          $(this).find("i").text("add");
        }
        return false;
      });

      $("#posts").on("click", ".more", function(){
          if ( $(this).text() == "More") {
              $(this).parent("div").next().show();
              $(this).text("Less");
          } else {
              $(this).parent("div").next().hide();
              $(this).text("More");
          }
          return false;
      });

      $(".image").change(async function(){
          var id = $(this).attr("id");
          console.log("id", id);
          var $button;
          if ( id == "image") {
            $button = $("#mint-button");
          } else {
            $button = $("#garden-button");
          }
          var fileInput = document.querySelector("#" + id);
          var files = fileInput.files;
          if ( files.length < 1 ) {
              return false;
          }
          var imageFile = files[0];
          console.log(imageFile);
          $("#status").text("Uploading image to IPFS...");
          M.toast({html: '🌱 Uploading image to IPFS...', displayLength: 60000});
          $button.text("Please Wait").prop('disabled', true);
          const response = await fetch('https://api.nft.storage/upload', { 
              method: 'post', 
              headers: new Headers({
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NkZiYmNhOEIzZDIwMDAzZTA2ZjMzZmRBN0E0NzUxMGExRUY5OTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODYxMDE4NzkwNiwibmFtZSI6InNwcm91dCBpbWFnZXMifQ.Y1lFAHCaStzfxyRB72iyWIyuPuU-7EoYgNcLwiBHu-8', 
                  'Content-Type': 'application/json'
              }), 
              body: imageFile
          });
          var result = await response.json();
          console.log( result );
          if (result.ok) {
              $("#status").text("Saved image to IPFS.");
              killToast();
              M.toast({html: '🌱 Saved image to IPFS'});
              if ( id == "image" ) {
                $button.text("Plant It!").prop('disabled', false);
              } else {
                $button.text("Create Garden").prop('disabled', false);
              }
              console.log("Image CID", result.value.cid);
              ipfsImageURL = "https://" + result.value.cid + ".ipfs.dweb.link/";
          }
          
      });

      $("#mint-button").click(async function(e){
          e.preventDefault();
          if ( !(correctChain()) ) {
            M.toast({html: '🌱 Change networks first!!'});
            return false;
          }
          $("#status").text("Saving to IPFS...");
          M.toast({html: '🌱 Saving Plant to IPFS...', displayLength: 60000});
          var sprout = $("#sprout").val();
          if (!sprout) {
              alert('Sprout is required');
          }
          var title = $("#title").val();
          var plant = $("#plant").val();
          var pubDate = moment.utc().unix();
          var plantJson = {
              "name": title,
              "description": sprout,
              "image": ipfsImageURL,
              "date": pubDate,
              "attributes": [
                  {
                      "trait": "content",
                      "value": plant
                  },
                  {
                    "trait": "date",
                    "value": pubDate
                  }
              ]
          };
          console.log(plantJson);

          const blob = new Blob([JSON.stringify(plantJson)], { type: 'application/json' });
          const file = new File([ blob ], 'metadata.json');
          const response = await fetch('https://api.nft.storage/upload', { 
              method: 'post', 
              headers: new Headers({
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NkZiYmNhOEIzZDIwMDAzZTA2ZjMzZmRBN0E0NzUxMGExRUY5OTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODYxMDE3NzQxNSwibmFtZSI6InNwcm91dCBtZXRhZGF0YSJ9.6YwPqstbUyRfNiGwEaYccfGZZYGmXOSuAuLzLduwdRM', 
                  'Content-Type': 'application/json'
              }), 
              body: file
          });
          var result = await response.json();
          console.log( result );
          if (result.ok) {
              $("#status").text("Saved to IPFS.");
              killToast();
              M.toast({html: '🌱 Saved Plant to IPFS'});

              var uri = "ipfs://" + result.value.cid;
              nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');
              //the transaction
              const tx = {
                  'from': ethereum.selectedAddress,
                  'to': gardenAddress,
                  'gasPrice': gas,
                  'nonce': "" + nonce,
                  'data': garden.methods.mint(uri).encodeABI()
              };
              console.log(tx);

              killToast();
              $("#status").text("Waiting for minting transaction...");
              M.toast({html: '🌱 Waiting for Minting transaction...', displayLength: 60000});
              const txHash = await ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [tx],
              });
              console.log("minted", txHash);
              $("#status").text("Minting transaction pending...");
              killToast();
              M.toast({html: '🌱 Minting transaction pending...', displayLength: 60000});

              var pendingTxHash = txHash;
              web3.eth.subscribe('newBlockHeaders', async (error, event) => {
                  if (error) {
                      console.log("error", error);
                  }
                  const blockTxHashes = (await web3.eth.getBlock(event.hash)).transactions;

                  if (blockTxHashes.includes(pendingTxHash)) {
                      web3.eth.clearSubscriptions();
                      $("#status").text("Plant minted!");
                      killToast();
                      M.toast({html: '🌱 Plant Minted!'});
                      $("#sprout").val("");
                      $("#title").val("");
                      $("#plant").val("");
                      ipfsImageURL = "";
                      // TODO: publishing stuff
                      var postHTML = getPostHTML(plantJson);
                      var tokenId = 0; // TODO get actual tokenId for newly minted plant
                      var receipt = await web3.eth.getTransactionReceipt(pendingTxHash);
                      $.each(receipt.logs, function(index, log){
                        if (log.address == gardenAddress) {
                          if (log.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
                            tokenId = web3.utils.hexToNumber(log.topics[3]);
                          }
                        }
                      });
                      console.log("tokenId is " + tokenId);
                      plantJson.tokenId = tokenId;
                      plantJson.address = gardenAddress;
                      plantJson.gardenName = gardenName;
                      plantJson.garden = gardenJson;
                      const apiResp = await fetch('https://api.sprout.gdn', { 
                          method: 'post', 
                          headers: new Headers({
                              'Content-Type': 'application/json'
                          }), 
                          body: JSON.stringify(plantJson)
                      });
                      console.log(await apiResp.json());
                      
                      if ( mode == "twitter") {
                        postHTML = getTweetHTML(plantJson);
                        var $post = $(postHTML).data("address", gardenAddress).data("token", tokenId);
                        $(".post").first().before($post);
                      } else {
                        var $post = $(postHTML).data("address", gardenAddress).data("token", tokenId);
                        $("#posts").prepend($post);
                        $("#minter").addClass("hide");
                        $("#fab").removeClass("hide").find("i").text("add");
                      }
                      
                  }
              });



          } else {
              // handle error
          }
          return false;
      });

      $("#garden-button").click(function(){
          var name = $("#name").val();
          var symbol = $("#symbol").val();
          var desc = $("#description").val();
          var link = $("#url").val();
          if ( name && symbol ) {
              createGarden(name, symbol, desc, link);
          } else {
              alert("Need both name and symbol to create a new garden");
          }
          return false;
      });

      $("body").on("click", ".follow", function(){
          var address = $(this).data("address");
          follow(address);
          return false;
      });

      $("body").on("click", ".claim", function(){
          claim();
          return false;
      });

      $("#posts, #plants").on("click", ".like", function(){
          const tokenId = $(this).parents("div.post").data("token");
          const address = $(this).parents("div.post").data("address");
          console.log(tokenId, address);
          like(address, tokenId);
          return false;
      });

  }); // docready