const Web3 = require("web3");

// 메타마스크 연결
async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}


// listing contract 정보 가져오기
async function loadContractListing() {
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

//작성한 거래 컨트랙에 판매 정보 조회
export async function getSellingInfo(_collection, _tokenId) {

  await loadWeb3();
  window.contract = await loadContractListing(_collection); // 컨트랙 정보 가져오기

  //판매 정보 조회
  const result = await window.contract.methods.getSellingInfoList(_collection, _tokenId).call();
  console.log(result)
  return result;

}

