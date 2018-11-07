
// needs abi and address
let web3Init = `
      // load web3.js
      var Web3 = require('web3');
      window.web3 = new Web3(window.web3.currentProvider);
      var contract = window.web3.eth.contract(JSON.parse(abi));
      var instance = contract.at(contractAddress);
`

let getBalance = `
    instance._eth.getBalance(instance._eth.accounts[0], function(err, result) {\n
        myBalance = result.c[0]; \n
        myBalance = web3.toWei(myBalance, 'ether'); \n
        var userBalance = document.createElement("div");\n
        userBalance.id = "user_balance";\n
        userBalance.innerHTML = "My Balance : " + myBalance;\n
        document.body.appendChild(userBalance);\n
    });
`
    
module.exports = {
    init : web3Init,
    balance : getBalance
}