'use strict'
var remixLib = require('remix-lib')
var EventManager = remixLib.EventManager
var yo = require('yo-yo')
var csjs = require('csjs-inject')

var globalRegistry = require('../../global/registry')

function BlockEditor (opts = {}, localRegistry) {
	var self = this

	self._components = {}
	self._components.registry = localRegistry || globalRegistry

	self._deps = {
		fileManager: self._components.registry.get('filemanager').api,
		config: self._components.registry.get('config').api
	}
	var isHidden = false; /////n0xx1

	self._view = {}

	self._view.textarea = yo`
	<textarea id="textarea" style="width:calc(34% - 10px); height:100%; float:right;">
	</textarea>
	`

	self._view.blocklyDiv = yo`
	<div id="blocklyDiv" style="width:100%; height:100%;">
	${self._view.textarea}
	</div>
	`

	self._view.el = yo`
	<div id="blockPanel">
	${self._view.blocklyDiv}
	</div>
	`
	var editor = self._components.registry.get('editor').api

	self.render = function () { return self._view.el }
	self.run = function() {
		var toolbox = '<xml id="toolbox">'
		toolbox += 	'<category name="Contracts" colour="120">'
			toolbox += 	'<block type="contract"></block>'
			toolbox +=  '<block type="contract_state"></block>'
			toolbox +=  '<block type="contract_state_get"></block>'
			toolbox +=  '<block type="contract_state_set"></block>'
			toolbox +=  '<block type="contract_method"></block>'
			toolbox +=  '<block type="contract_method_parameter"></block>'
			toolbox +=  '<block type="contract_method_parameter_get"></block>'
			toolbox +=  '<block type="contract_intrinsic_sha3"></block>'
			toolbox +=  '<block type="contract_ctor"></block>'
			toolbox +=  '<block type="contract_method_call"></block>'
		toolbox += 	'</category>'
		toolbox += 	'<category name="Logic" colour="210">'
			toolbox +=  '<block type="math_number"></block>'
			toolbox +=  '<block type="math_arithmetic"></block>'
			toolbox +=  '<block type="logic_boolean"></block>'
			toolbox +=  '<block type="logic_compare"></block>'
			toolbox +=  '<block type="controls_ifelse"></block>'
			toolbox +=  '<block type="controls_if"></block>'
			toolbox +=  '<block type="logic_operation"></block>'		
			toolbox +=  '<block type="math_arithmetic"></block>'
			toolbox +=  '<block type="logic_negate"></block>'
			toolbox +=  '<block type="logic_null"></block>'
			toolbox +=  '<block type="logic_ternary"></block>'
		toolbox +=	'</category>'
		toolbox +=	'<category name="etc.." colour="230">'
			toolbox +=  '<block type="math_number"></block>'
			toolbox +=  '<block type="math_single"></block>'
			toolbox +=  '<block type="math_number_property"></block>'
			toolbox +=  '<block type="contract_struct"></block>'
			toolbox +=  '<block type="expression_expr"></block>'
		toolbox +=	'</category>'
		toolbox +=  '</xml>'

		var workspace = Blockly.inject(
			'blocklyDiv',
			{
				toolbox: toolbox,
				media: '',
				scrollbars: true,
				zoom: {
					controls: true
				},
				grid: {
					spacing: 25,
					length: 3,
					colour: '#ccc',
					snap: true
				},
			})

		Blockly.Xml.domToWorkspace(
			Blockly.Xml.textToDom(
				'<xml><block type="contract" deletable="false" movable="false"></block></xml>'
				),
			workspace
			)



		// var contractBlock = workspace.getTopBlocks()[0];

		// console.log('work space top blocks')
		// console.log(workspace.getTopBlocks())

		function setDisabledRec(block, disabled) {
			block.setDisabled(disabled)
			block.setMovable(true)

			var children = block.getChildren()
			for (var i = 0; i < children.length; i++) {
				setDisabledRec(children[i], disabled)
			}
			// console.log('set disabled rec')
		}

		document.getElementById('textarea').value = 'pragma solidity ^0.4.24;\n\n'

		function myUpdateFunction(event) {


			var contractBlockCount = workspace.getTopBlocks().length

			var code = 'pragma solidity ^0.4.24;\n\n'

			for(var i = 0; i< contractBlockCount ; i ++) {
				var contractBlock = workspace.getTopBlocks()[i]
				code += Blockly.Solidity.blockToCode(contractBlock)
				var topBlocks = workspace.getAllBlocks()
				for (var j = 0; j < topBlocks.length; j++) {
					var block = topBlocks[j]

					if (contractBlock == block) {
						continue
					}

					if (!block.getParent()) {
						// setDisabledRec(block, true)
					}  else if (block.getParent() == contractBlock) {
						// setDisabledRec(block, false)
					}
				}				
			}

			// var contractBlock = workspace.getTopBlocks()[0]

			// var code = Blockly.Solidity.blockToCode(contractBlock)
			// var topBlocks = workspace.getAllBlocks()
			// for (var i = 0; i < topBlocks.length; i++) {
			// 	var block = topBlocks[i]

			// 	if (contractBlock == block) {
			// 		continue
			// 	}

			// 	if (!block.getParent()) {
			// 		setDisabledRec(block, true)
			// 	}  else if (block.getParent() == contractBlock) {
			// 		setDisabledRec(block, false)

			// 	}
			// }

			document.getElementById('textarea').value = code
			editor.setText(code)
		}


		workspace.addChangeListener(myUpdateFunction)  
	}
}

module.exports = BlockEditor