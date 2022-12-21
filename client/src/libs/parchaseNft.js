const Web3 = require("web3");

// 메타마스크 연결
async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}


// purchase contract 정보 가져오기
async function loadContractPurchasing() {
    let abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "collection",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getSellingInfoList",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address payable",
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct TransactionNFT.SellInfo",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "collection",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "isSalesRegistrantion",
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
                    "internalType": "address",
                    "name": "_collection",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "purchaseNFT",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_collection",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "salesRegistration",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let address = "0x95602fd56336Ca99b2a08143B47838B2dC0F27e3"; // your contract address here
    return await new window.web3.eth.Contract(abi, address);
  }

// 현재 계정 주소 가져오기
async function getCurrentAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}


//작성한 거래 컨트랙에 구매 실행
export async function purchaseNft(_collection, _tokenId, _price) {

  await loadWeb3();
  window.contract = await loadContractPurchasing(_collection); // 컨트랙 정보 가져오기
  const account = await getCurrentAccount(); // 계정 정보 가져오기


  
    //구매
    let result  = await window.contract.methods
        .purchaseNFT(_collection, _tokenId) 
        .send({ from: account, value: "0x" + Web3.utils.toBN(Web3.utils.toWei(_price, "ether")).toString(16)}); // purchaseNFT 트랜잭션 보내기

    return result;


}
