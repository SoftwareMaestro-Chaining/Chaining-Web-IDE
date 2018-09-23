'use strict'
var remixLib = require('remix-lib')
var EventManager = remixLib.EventManager
var yo = require('yo-yo')
var csjs = require('csjs-inject')

var globalRegistry = require('../../global/registry')

function BlockEditor (opts = {}, localRegistry) {
  var self = this
  var el = yo`
  <div id="input">
  	<textarea id="textarea" style="width:calc(34% - 10px); height:600px; float:right">
  	</textarea>
  </div>`

  self.render = function () { return el }
}

module.exports = BlockEditor