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
    instance._eth.getBalance(instance._eth.accounts[0], function(err, result) { <br/>
        myBalance = result.c[0]; <br/>
        myBalance = web3.toWei(myBalance, 'ether'); <br/>
        var userBalance = document.createElement("div");<br/>
        userBalance.id = "user_balance"; <br/>
        userBalance.innerHTML = "My Balance : " + myBalance; <br/>
        document.body.appendChild(userBalance); <br/>
    });
</p>`

module.exports = {
  init: web3Init,
  balance: getBalance
}
