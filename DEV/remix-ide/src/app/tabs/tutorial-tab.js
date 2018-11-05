'use strict'

const yo = require('yo-yo')
const csjs = require('csjs-inject')
const css = require('./styles/tutorial-tab-styles')
const helper = require('../../lib/helper') 

const modalDialog = require('../ui/modaldialog')
const modalDialogCustom = require('../ui/modal-dialog-custom')

const globalRegistry = require('../../global/registry');

function TutorialTab(opts, localRegistry) {

    const self = this

    self._view = {}

    self._components = {}
    self._components.registry = localRegistry || globalRegistry

    self._deps = {
        udapp: self._components.registry.get('udapp').api,
        compiler : self._components.registry.get('compiler').api
    }
    const container = yo `
        <div class="${css.tutorialTabView}" id="tutorialTabView"></div>
        `

    self._view.instanceContainer = yo`<div class="${css.instanceContainer}"></div>`
   

    self._deps.compiler.event.register('compilationFinished', function (success, data, source) { 
      getContractNames(success, data)
      if (success) {
        console.log('success in tutorial tab')
        console.log(data)
      } else {
        console.log('fail in tutorial')
        console.log(data)
      }
    }) 
    
  

    function getContractNames (success, data) {
      // var contractNames = document.querySelector('')
      // contractNames.innerHTML = ''
      let instanceContainer = yo`<div></div>`

      let message = ''
      let defaultButton = yo `
        <button class="${css.instanceButton}" id="instanceButton" onclick=${() => popup(message)}>
          get Balance
        </button>
      `
      instanceContainer.appendChild(defaultButton)      

      if (success) {
        console.log('success in get contract name')
        selectContractNames.removeAttribute('disabled')
        console.log('visit contract')
        
        self._deps.compiler.visitContracts((contract) => {
          let instanceABI = contract.object.abi
          console.log('instance ABI')
          console.log(instanceABI)          

          for(let i=0; i<instanceABI.length; i++) {
            let abiName = instanceABI[i].name
            let isPayable = instanceABI[i].constant // false ; payable / true ; non payable
            let input = instanceABI[i].inputs
            let inputLength = input.length
            let output = instanceABI[i].outputs
            let outputLength = output.length

            let message= abiName + " " + inputLength + " " + outputLength

            let abis = yo`
            <button class="${css.instanceButton}" id="instanceButton" onclick=${() => popup(message)}>
              ${abiName}
            </button>`
            instanceContainer.appendChild(abis)
          }



          function popup(message) {
            modalDialogCustom.alert(message)
          }




          // self._view.instanceContainer.appendChild(instanceContainer)
          // contractNames.appendChild(yo`<option value="${contract.name}">${contract.name}</option>`)
        })
      } else {
        console.log('fail in get contract name')
        // selectContractNames.setAttribute('disabled', true)
      }
      yo.update(self._view.instanceContainer, instanceContainer)
    }

    var selectContractNames = yo`<select class="${css.contractNames}" disabled></select>`

//    let instance = makeInstance(self._components.registry, self)

    const el = yo `
    <div>
      ${self._view.instanceContainer}
    </div>`

    container.appendChild(el)
    return { render() { return container } }
}

module.exports = TutorialTab