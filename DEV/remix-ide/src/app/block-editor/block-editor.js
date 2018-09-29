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


	this.previousInput = ''

	var event = new EventManager()
	self.event = event

	var sessions = {}
	var currentSession
	var emptySession = createSession('')
	var readOnlySession = {}
	var sourceAnnotations = []


	this.get = function(path) {
		console.log('block editor get')
		console.log(path)
		if (!path || currentSession === path) {
			console.log('path get value')
			console.log(document.getElementById('textarea').value)
			return document.getElementById('textarea').value
		} else if (sessions[path]) {
			console.log('일로오나..?')
			return sessions[path].getValue()
		} else {
			console.log('...? ㅠㅠㅠㅠ')
			return document.getElementById('textarea').value
		}
	}

	this.current = function() {
		return currentSession
	}

	function createSession(content) {
	}

	this.open = function(path, conntent) {
	}

	this.clearAnnotations = function () {
		sourceAnnotations = []
	}

	this.addAnnotation = function (annotation) {
		sourceAnnotations[sourceAnnotations.length] = annotation
		this.setAnnotations(sourceAnnotations)
	}

	this.setAnnotations = function (sourceAnnotations) {
		// setAnnotations(sourceAnnotations)
	}
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

	self.render = function () { return self._view.el }
	self.run = function() {
		var toolbox = '<xml>'
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
		toolbox +=  '<block type="math_number"></block>'
		toolbox +=  '<block type="math_arithmetic"></block>'
		toolbox +=  '<block type="logic_boolean"></block>'
		toolbox +=  '<block type="logic_compare"></block>'
		toolbox +=  '<block type="controls_ifelse"></block>'
		toolbox +=  '<block type="controls_if"></block>'
		toolbox +=  '<block type="logic_operation"></block>'
		toolbox +=  '<block type="math_arithmetic"></block>'

		toolbox +=  'block type="logic_negate"></block>'
		toolbox +=  'block type="logic_null"></block>'
		toolbox +=  'block type="logic_ternary"></block>'

		toolbox +=  '<block type="math_number"></block>'
		toolbox +=  '<block type="math_single"></block>'
		toolbox +=  '<block type="math_number_property"></block>'

		toolbox +=  '<block type="contract_struct"></block>'
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



		var contractBlock = workspace.getTopBlocks()[0];

		console.log('work space top blocks')
		console.log(workspace.getTopBlocks())

		function setDisabledRec(block, disabled) {
			block.setDisabled(disabled)
			block.setMovable(true)

			var children = block.getChildren()
			for (var i = 0; i < children.length; i++) {
				setDisabledRec(children[i], disabled)
			}
			console.log('set disabled rec')
		}

		function myUpdateFunction(event) {

			console.log('work space')
			console.log(workspace)

			console.log(contractBlock)

			var code

			console.log('top block length')
			console.log(workspace.getTopBlocks.length)


			for(var j=0; j < workspace.getTopBlocks.length; j++) {
				code += Blockly.Solidity.blockToCode(workspace.getTopBlocks()[j])
				var topBlocks = workspace.getAllBlocks()				
				for (var i = 0; i < topBlocks.length; i++) {
					var block = topBlocks[i]

					if (contractBlock == block) {
						continue
					}

					if (!block.getParent()) {
						setDisabledRec(block, true)
					} else if (block.getParent() == contractBlock) {
						setDisabledRec(block, false)

					}
				}
			}

			document.getElementById('textarea').value = code
			blockEditorOnChange(self)
		}

		// function switchBlocklyEditor() {
  //     // $( document ).click(function() {
  //       	$(#blockPanel).toggle( "fold" );
  //     // });
  // 		}


		workspace.addChangeListener(myUpdateFunction)  
	}
}

function blockEditorOnChange(self) {

	console.log('block editor change')
	console.log(self)
	console.log(self.code)

	var currentFile = self._deps.config.get('currentFile')
	if(!currentFile) {
		return
	}
	var input = self.get(currentFile)
	console.log('block input')
	console.log(input)

	if(!input) {
		return
	}

	if(input === self.previousInput) {
		return
	}

	self.previousInput = input

	if(self.saveTimeout) {
		window.clearTimeout(self.saveTimeout)
	}

	self.saveTimeout = window.setTimeout(() => {
		self._deps.fileManager.saveCurrentFile()
	}, 5000)

}

module.exports = BlockEditor