const Web3 = require('web3');

const rpcURL = "https://goerli.infura.io/v3/64f98062f06545f5ba318c39652646a6"; // Infura RPC URL 

const web3 = new Web3(rpcURL); // Web3 객체 생성


module.exports = {

  // owner_address 가 보유한 NFT 목록 조회
  findByOwnerAddr: async (req, res) => {
    const owner_address = req.params.owner_address; // owner_address param 접근
    const options = {method: 'GET'};


    fetch(`https://testnets-api.opensea.io/api/v1/collections?asset_owner=${owner_address}&offset=0&limit=300`, options)
    .then(response => response.json())
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(err => {
      return res.status(404).send();
    });



  },
};
