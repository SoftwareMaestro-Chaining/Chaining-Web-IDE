/* global */
'use strict'

var $ = require('jquery')
var yo = require('yo-yo')
var helper = require('./lib/helper')
var copyToClipboard = require('./app/ui/copy-to-clipboard')
var css = require('./universal-dapp-styles')
var MultiParamManager = require('./multiParamManager')

function UniversalDAppUI (udapp, opts = {}) {
  this.udapp = udapp
}

UniversalDAppUI.prototype.renderInstance = function (contract, address, contractName) {
  var noInstances = document.querySelector('[class^="noInstancesText"]')
  if (noInstances) {
    noInstances.parentNode.removeChild(noInstances)
  }
  var abi = this.udapp.getABI(contract)
  return this.renderInstanceFromABI(abi, address, contractName)
}

// TODO this function was named before "appendChild".
// this will render an instance: contract name, contract address, and all the public functions
// basically this has to be called for the "atAddress" (line 393) and when a contract creation succeed
// this returns a DOM element
UniversalDAppUI.prototype.renderInstanceFromABI = function (contractABI, address, contractName) {
  var self = this
  address = (address.slice(0, 2) === '0x' ? '' : '0x') + address.toString('hex')
  var instance = yo`<div class="instance ${css.instance} ${css.hidesub}" id="instance${address}"></div>`
  var context = self.udapp.context()

  var shortAddress = helper.shortenAddress(address)
  var title = yo`
  <div class="${css.title}" onclick=${toggleClass}>
  <div class="${css.titleText}"> ${contractName} at ${shortAddress} (${context}) </div>
  ${copyToClipboard(() => address)}
  </div>`

  if (self.udapp.removable_instances) {
    var close = yo`<div class="${css.udappClose}" onclick=${remove}><i class="${css.closeIcon} fa fa-close" aria-hidden="true"></i></div>`
    title.appendChild(close)
  }

  function remove () {
    instance.remove()
    // @TODO perhaps add a callack here to warn the caller that the instance has been removed
  }

  function toggleClass () {
    $(instance).toggleClass(`${css.hidesub}`)
  }

  instance.appendChild(title)

  // Add the fallback function
  var fallback = self.udapp.getFallbackInterface(contractABI)
  if (fallback) {
    instance.appendChild(this.getCallButton({
      funABI: fallback,
      address: address,
      contractAbi: contractABI,
      contractName: contractName
    }))
  }

  var methods = ""
  var index = 0
  $.each(contractABI, (i, funABI) => {
    if (funABI.type !== 'function') {
      return
    }

    methods += "contractInstance.methods."+funABI.name +"(args["+index+"])\n"

    // @todo getData cannot be used with overloaded functions
    instance.appendChild(this.getCallButton({
      funABI: funABI,
      address: address,
      contractAbi: contractABI,
      contractName: contractName
    }))
    index++
  })

  var content = JSON.stringify(contractABI)

  var tag = 'javascript'

  if(tag == 'javascript') {
    var totalCode = "// npm install --save web3\n" 
    totalCode += "// setting web3 and connect\n"
    totalCode += "var abi = '" + content +"'\n"
    totalCode += "var contractAddress = '" + address + "'\n"
    totalCode += "var Web3 = require('web3') \n"
    totalCode += "var web3 = new Web3()\n"
    totalCode += "web3.setProvider(new web3.providers.HttpProvider('http://192.168.99.20:8545'))\n" 
    totalCode += "var contractInstance = web3.eth.contract(abi).at(contractAddress)\n"
    totalCode += "\n"
    totalCode += "// input your arguments\n"
    totalCode += "var args = []\n"    
    totalCode += "\n"
    totalCode += "// How to use it\n"    
  } 

  totalCode += methods

  document.getElementById('textarea').value = totalCode

  return instance
}

// TODO this is used by renderInstance when a new instance is displayed.
// this returns a DOM element.
UniversalDAppUI.prototype.getCallButton = function (args) {
  var self = this
  // args.funABI, args.address [fun only]
  // args.contractName [constr only]
  var lookupOnly = args.funABI.constant

  var outputOverride = yo`<div class=${css.value}></div>` // show return value

  function clickButton (valArr, inputsValues) {
    self.udapp.call(true, args, inputsValues, lookupOnly, (decoded) => {
      outputOverride.innerHTML = ''
      outputOverride.appendChild(decoded)
    })
  }

  var multiParamManager = new MultiParamManager(lookupOnly, args.funABI, (valArray, inputsValues, domEl) => {
    clickButton(valArray, inputsValues, domEl)
  }, self.udapp.getInputs(args.funABI))

  var contractActionsContainer = yo`<div class="${css.contractActionsContainer}" >${multiParamManager.render()}</div>`
  contractActionsContainer.appendChild(outputOverride)

  return contractActionsContainer
}

module.exports = UniversalDAppUI
