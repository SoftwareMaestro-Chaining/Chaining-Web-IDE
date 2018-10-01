/**
 * @fileoverview Helper functions for generating Solidity for blocks.
 * @author jeanmarc.leroux@google.com (Jean-Marc Le Roux)
 */
'use strict';

goog.require('Blockly.Solidity');

Blockly.Solidity['contract'] = function(block) {
  var states = Blockly.Solidity.statementToCode(block, 'STATES');
  var ctor = Blockly.Solidity.statementToCode(block, 'CTOR');
  var methods = Blockly.Solidity.statementToCode(block, 'METHODS');
  var code = 'contract ' + block.getFieldValue('NAME') + ' {\n'
    + states
    + ctor
    + methods
    + '}\n';

  return code;
};

Blockly.Solidity['contract_state'] = function(block) {
  var name = block.getFieldValue('NAME');
  var value = block.getFieldValue('VALUE');
  // var value = Blockly.Solidity.valueToCode(block, 'VALUE', Blockly.Solidity.ORDER_ASSIGNMENT);
  var type = block.getFieldValue('TYPE');
  var types = {
    'TYPE_BOOL': 'bool',
    'TYPE_INT': 'int',
    'TYPE_UINT': 'uint',
    'TYPE_ADDRESS': 'address',
    'TYPE_STRING': 'string'

  };
  var defaultValue = {
    'TYPE_BOOL': 'false',
    'TYPE_INT': '0',
    'TYPE_UINT': '0',
    'TYPE_ADDRESS': '0x0',
    'TYPE_STRING': 'LoveChaining'
  };

  console.log("#######"+value);

  if (value === '') {
    value = defaultValue[type];
  } else {
    value = value;
  }

  if (type == 'TYPE_STRING') {
    value = '"' + value + '"'
  }

  return types[type] + ' ' + name + ' = ' + value + ';\n';
};

Blockly.Solidity['contract_state_get'] = function(block) {
  var variableId = block.getFieldValue('STATE_NAME');
  var variable = block.workspace.getVariableById(variableId);

  if (!variable) {
    return '';
  }

  return [Blockly.Solidity.getVariableName(variable), Blockly.Solidity.ORDER_ATOMIC];
};


Blockly.Solidity['contract_state_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Solidity.valueToCode(block, 'STATE_VALUE',
      Blockly.Solidity.ORDER_ASSIGNMENT) || '0';
  var variableId = block.getFieldValue('STATE_NAME');
  var variable = block.workspace.getVariableById(variableId);

  if (!variable) {
    return '';
  }

  return Blockly.Solidity.getVariableName(variable) + ' = ' + argument0 + ';\n';
};
