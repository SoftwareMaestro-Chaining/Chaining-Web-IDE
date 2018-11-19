"use strict"

const yo = require("yo-yo")
const csjs = require("csjs-inject")
const css = require("./styles/tutorial-tab-styles")
const helper = require("../../lib/helper")

const modalDialog = require("../ui/modaldialog")
const modalDialogCustom = require("../ui/modal-dialog-custom-2")

const globalRegistry = require("../../global/registry")

const code = require("./tutorial-code/tutorial-code.js")

const beautify = require("js-beautify").js

function TutorialTab(opts, localRegistry) {
  const self = this

  self._view = {}

  self._components = {}
  self._components.registry = localRegistry || globalRegistry

  self._deps = {
    udapp: self._components.registry.get("udapp").api,
    compiler: self._components.registry.get("compiler").api
  }
  const container = yo`
        <div class="${css.tutorialTabView}" id="tutorialTabView"></div>
        `

  self._view.instanceContainer = yo`<div class="${
    css.instanceContainer
  }"></div>`

  self._deps.compiler.event.register("compilationFinished", function(
    success,
    data,
    source
  ) {
    if (success) {
      console.log("is success")
      getContractNames(success, data)
    } else {
      console.log("not success")
      let instanceContainer = yo`<div></div>`
      yo.update(self._view.instanceContainer, instanceContainer)
    }
  })

  function getContractNames(success, data) {
    // var contractNames = document.querySelector('')
    // contractNames.innerHTML = ''
    let instanceContainer = yo`<div></div>`

    let balanceMessage = code.balance

    let balanceButton = yo`
        <button class="${
          css.instanceButton
        }" id="instanceButton" onclick=${() => popup(balanceMessage)}>
          get Balance
        </button>
      `
    function popup(message) {
      modalDialogCustom.alertCustom(message)
    }

    instanceContainer.appendChild(balanceButton)
    let br = yo`<br/>`
    instanceContainer.appendChild(br)

    if (success) {
      // selectContractNames.removeAttribute('disabled')

      self._deps.compiler.visitContracts(contract => {
        let contractName = yo`
            <div>${contract.name}</div>
          `

        instanceContainer.appendChild(contractName)

        let instanceABI = contract.object.abi

        let instanceMessage = code.init

        instanceMessage = yo`
        <p>
         let abi = ${JSON.stringify(instanceABI)}
         <br/> let contractAddress = {your contract address}
         ${instanceMessage}
        </p>`

        let instanceButton = yo`
            <button class="${
              css.instanceButton
            }" id="instanceButton" onclick=${() =>
          popup(instanceMessage)}> init </button>
          `

        instanceContainer.appendChild(instanceButton)
        instanceContainer.appendChild(br)

        for (let i = 0; i < instanceABI.length; i++) {
          let abiName = instanceABI[i].name
          let isPayable = instanceABI[i].constant // false ; payable / true ; non payable
          let input = instanceABI[i].inputs
          let inputLength = input.length

          let type = instanceABI[i].type

          let output
          let outputLength = 0
          if (type != "constructor") {
            output = instanceABI[i].outputs
            outputLength = output.length

            console.log(output)
          }

          let inputFunctionValue = ``
          for (let j = 0; j < inputLength; j++) {
            inputFunctionValue += `arg` + j
            if (j !== inputLength - 1) {
              inputFunctionValue += `, `
            }
          }

          let inputInstanceValue = ``
          for (let j = 0; j < inputLength; j++) {
            inputInstanceValue += `arg` + j + `, `
          }

          let code = ``
          if (!isPayable) {
            code = yo`
              <p>function ${abiName} (${inputFunctionValue}) { <br/>
              instance.${abiName} (
              ${inputInstanceValue}
              { <br/>
                from : instance._eth.accounts[0], <br/>
                gas : 3000000 <br/>
              }, function(err, result) {  <br/>
              })</p>`
          } else {
            let test = `return new Promise((res, rej) => { `
            code = yo`<p>
             function ${abiName} (${inputFunctionValue}) { <br/>
               ${test} <br/>
                  instance.${abiName}(${inputFunctionValue}, function (err, result) { <br/>
                    res(result)
                }) <br/>
              }) <br/>
             }</p>`
          }

          console.log(code)

          // let message= abiName + " " + inputLength + " " + outputLength

          if (abiName) {
            if (!isPayable) {
              let abis = yo`
              <button class="${
                css.instanceButtonNonePay
              }" id="instanceButton" onclick=${() => popup(code)}>
                ${abiName}
              </button>`
              instanceContainer.appendChild(abis)
            } else {
              let abis = yo`
              <button class="${
                css.instanceButton
              }" id="instanceButton" onclick=${() => popup(code)}>
                ${abiName}
              </button>`
              instanceContainer.appendChild(abis)
            }
            instanceContainer.appendChild(br)
          }
        }

        // self._view.instanceContainer.appendChild(instanceContainer)
        // contractNames.appendChild(yo`<option value="${contract.name}">${contract.name}</option>`)
      })
    } else {
      console.log("fail in get contract name")
      // selectContractNames.setAttribute('disabled', true)
    }
    yo.update(self._view.instanceContainer, instanceContainer)
  }

  // var selectContractNames = yo`<select class="${css.contractNames}" disabled></select>`

  //    let instance = makeInstance(self._components.registry, self)

  const el = yo`
    <div>
      ${self._view.instanceContainer}
    </div>`

  container.appendChild(el)
  return {
    render() {
      return container
    }
  }
}

module.exports = TutorialTab
