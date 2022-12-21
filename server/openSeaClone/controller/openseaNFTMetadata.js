const options = {method: 'GET'};
const axios = require('axios')

module.exports = async (req, res) => {
    axios(`https://testnets-api.opensea.io/api/v1/asset/${req.params.address}/${req.params.id}`, options)
    .then(response => {
    console.log(response.data)
    res.status(200).send(response.data)
        })
    .catch(err => res.send(err));
}

