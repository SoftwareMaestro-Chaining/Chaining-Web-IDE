'use strict'

const yo = require('yo-yo')
const csjs = require('csjs-inject')
const css = require('./styles/tutorial-tab-styles')
const helper = require('../../lib/helper')

const globalRegistry = require('../../global/registry');

function TutorialTab(opts, localRegistry) {

    const self = this

    self._view = {}

    self._components = {}
    self._components.registry = localRegistry || globalRegistry

    self._deps = {
        
    }

    self._view.instanceContainer = yo`<div class="${css.instanceContainer}"></div>`

    const container = yo `
        <div class="${css.tutorialTabView}" id="tutorialTabView"></div>
    `

    const el = yo `
    <div>

    </div>`

    container.appendChild(el)
    return { render() { return container}}
}

TutorialTab.prototype.addInstance = function(abi, address, name){

    self._view.instanceContainer.appendChild(renderInstanceFromABI(abi, address, name))
}

TutorialTab.prototype.renderInstanceFromABI = function (contractABI, address, contractName) {
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
      var totalCode = "var abi = '" + content +"'\n"
      totalCode += "var contractAddress = '" + address + "'\n"
      totalCode += "var Web3 = require('web3') \n"
      totalCode += "var web3 = new Web3()\n"
      totalCode += "web3.setProvider(new web3.providers.HttpProvider('http://192.168.99.20:8545'))\n" 
      totalCode += "var contractInstance = web3.eth.contract(abi).at(contractAddress)\n"
  
      var howToUse = "/ input your arguments\n"
      howToUse += "var args = []\n"
      howToUse += "\n"
      howToUse += "// How to use it\n"
      howToUse += methods
    } 
  
  //  document.getElementById('textarea').value = totalCode
  //  document.getElementById('third-tab-area').value = howToUse
  
    return instance
}
  

  // TODO this is used by renderInstance when a new instance is displayed.
// this returns a DOM element.
TutorialTab.prototype.getCallButton = function (args) {
    var self = this
    // args.funABI, args.address [fun only]
    // args.contractName [constr only]
    var lookupOnly = args.funABI.constant
  
    var outputOverride = yo`<div class=${css.value}></div>` // show return value
  
    
    var contractActionsContainer = yo`<div class="${css.contractActionsContainer}" >${multiParamManager.render()}</div>`
    contractActionsContainer.appendChild(outputOverride)
  
    return contractActionsContainer
}

module.exports = TutorialTab