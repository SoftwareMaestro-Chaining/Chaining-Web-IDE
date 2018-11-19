// needs abi and address
const yo = require("yo-yo")

let web3Init = yo`
<p>
      // load web3.js
      var Web3 = require('web3'); <br/> 
      window.web3 = new Web3(window.web3.currentProvider); <br/>
      var contract = window.web3.eth.contract(JSON.parse(abi)); <br/>
      var instance = contract.at(contractAddress); <br/>
</p>`

let getBalance = yo`<p>
    return new Promise((res, rej) => { <br/>
      instance._eth.getBalance(instance._eth.accounts[0], function(err, result) { <br/>
        res(result) <br/>
      }) <br/>
    }) <br/>
</p>`

module.exports = {
  init: web3Init,
  balance: getBalance
}
