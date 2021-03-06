"use strict"

goog.provide("Blockly.Solidity.contract")

Blockly.Extensions.register("declare_typed_variable", function() {
  var block = this

  if (!this.getVariableNameField) {
    throw "missing getVariableNameField method"
  }

  if (!this.getVariableType) {
    throw "missing getVariableType method"
  }

  if (!this.getVariableGroup) {
    throw "missing getVariableGroup method"
  }

  if (!this.getVariableScope) {
    throw "missing getVariableScope method"
  }

  this.declareOrUpdateVariable = function(name, force = false) {
    var oldName = this.getVariableNameField().getValue()

    if (!this.getParent()) {
      return oldName
    }

    if (!force && (!this.getParent() || oldName == name)) {
      return oldName
    }

    var group = this.getVariableGroup()
    var scope = this.getVariableScope()
    var type = this.getVariableType()

    if (!Blockly.Solidity.getVariableByNameAndScope(name, scope, group)) {
      newName = name
    } else {
      var count = 2
      var newName = name + count
      while (
        Blockly.Solidity.getVariableByNameAndScope(newName, scope, group)
      ) {
        count++
        newName = name + count
      }
    }

    var variable = Blockly.Solidity.getVariableById(this.workspace, this.id)
    if (!variable) {
      Blockly.Solidity.createVariable(
        this.workspace,
        group,
        type,
        newName,
        scope,
        this.id
      )
    } else {
      variable.name = newName
    }

    if (force) {
      this.getVariableNameField().setText(newName)
    }

    Blockly.Solidity.updateWorkspaceNameFields(this.workspace)

    return newName
  }

  this.getVariableNameField().setValidator(function(name) {
    return block.declareOrUpdateVariable(name)
  })

  var onchange = null
  if (goog.isFunction(this.onchange)) {
    onchange = this.onchange
  }

  this.setOnChange(function(event) {
    Blockly.Solidity.updateWorkspaceNameFields(this.workspace)
    Blockly.Solidity.updateWorkspaceStateTypes(this.workspace)
    Blockly.Solidity.updateWorkspaceParameterTypes(this.workspace)

    if (event.blockId != this.id) {
      return
    }

    if (event.type == "move" && !!event.oldParentId) {
      if (!!Blockly.Solidity.getVariableById(this.workspace, this.id)) {
        Blockly.Solidity.deleteVariableById(this.workspace, this.id)
      }
    }
    if (event.type == "move" && !!event.newParentId) {
      if (!this.workspace.getVariableById(this.id)) {
        this.declareOrUpdateVariable(
          this.getVariableNameField().getValue(),
          true
        )
      }
    }
    if (event.element == "field" && event.name == "TYPE") {
      var variable = this.workspace.getVariableById(this.id)

      variable.type = this.getVariableType()
      Blockly.Solidity.updateWorkspaceStateTypes(this.workspace)
    }

    if (!!onchange) {
      onchange.call(block, event)
    }
  })
})

//   "args5": [
//   {
//     "type": "field_input",
//     "name": "PAY",
//     "check": ["payable_state"],
//   }
// ],

Blockly.defineBlocksWithJsonArray([
  {
    type: "contract",
    message0: "contract name %1 is %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        check: "String",
        text: "MyContract"
      },
      {
        type: "field_input",
        name: "INHERITANCE",
        check: "String",
        text: ""
      }
    ],
    message1: "state %1",
    args1: [
      {
        type: "input_statement",
        name: "STATES",
        check: ["contract_state"],
        align: "RIGHT"
      }
    ],
    message2: "constructor %1",
    args2: [
      {
        type: "input_statement",
        name: "CTOR",
        check: ["contract_ctor"],
        align: "RIGHT"
      }
    ],
    message3: "function %1 ",
    args3: [
      {
        type: "input_statement",
        name: "METHODS",
        check: ["contract_method"],
        align: "RIGHT"
      }
    ],
    colour: 160,
    tooltip: "Declares a new smart contract."
  }
])

Blockly.Blocks["type_list"] = {
  // List type.
  valueType: "Array",
  init: function() {
    this.jsonInit({
      message0: "Array",
      output: "Type",
      colour: 230,
      tooltip: "Arrays (lists) are allowed.",
      helpUrl: "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    })
  }
}

Blockly.Blocks["contract_state"] = {
  init: function() {
    var nameField = new Blockly.FieldTextInput("myVar")
    var valueField = new Blockly.FieldTextInput("")
    this.appendDummyInput()
      .appendField("type")
      .appendField(
        new Blockly.FieldDropdown([
          ["bool", "TYPE_BOOL"],
          ["int", "TYPE_UINT"],
          ["address", "TYPE_ADDRESS"],
          ["string", "TYPE_STRING"]
        ]),
        "TYPE"
      )
      .appendField("name")
      .appendField(nameField, "NAME")
      .appendField("being set to")
      .appendField(valueField, "VALUE")
    this.setPreviousStatement(true, "contract_state")
    this.setNextStatement(true, "contract_state")
    this.setColour(195)
    this.contextMenu = false

    this._stateNameInitialized = false

    this.getVariableNameField = function() {
      return nameField
    }
    this.getVariableType = function() {
      return this.getFieldValue("TYPE")
    }
    this.getVariableGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_STATE
    }
    this.getVariableScope = function() {
      var scope = this.getParent()
      while (!!scope && scope.type != "contract") {
        scope = scope.getParent()
      }
      return scope
    }

    Blockly.Extensions.apply("declare_typed_variable", this, false)
  }
}

Blockly.Blocks["contract_state_get"] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["select state...", Blockly.Solidity.UNDEFINED_NAME]
      ]),
      "STATE_NAME"
    )
    this.setOutput(true, null)
    this.setColour(195)

    this.getVariableNameSelectField = function() {
      return this.getField("STATE_NAME")
    }
    this.getVariableLabelGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_STATE
    }
  }
}

Blockly.Blocks["contract_state_set"] = {
  init: function() {
    this.appendValueInput("STATE_VALUE")
      .appendField("set")
      .appendField(
        new Blockly.FieldDropdown(
          [["select state...", Blockly.Solidity.UNDEFINED_NAME]],
          this.validate
        ),
        "STATE_NAME"
      )
      .appendField("to")
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(195)

    this.getVariableNameSelectField = function() {
      return this.getField("STATE_NAME")
    }
    this.getVariableLabelGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_STATE
    }
  },

  validate: function(stateNameVariableId) {
    var workspace = this.sourceBlock_.workspace
    // FIXME: dirty hack to make sure updateWorkspaceStateTypes is called right after validate
    setTimeout(function() {
      Blockly.Solidity.updateWorkspaceStateTypes(workspace)
    }, 1)
    return stateNameVariableId
  }
}

Blockly.Blocks["contract_method_parameter"] = {
  init: function() {
    var nameField = new Blockly.FieldTextInput("p")
    this.appendDummyInput()
      .appendField("let")
      .appendField(
        new Blockly.FieldDropdown([
          ["bool", "TYPE_BOOL"],
          ["int", "TYPE_INT"],
          ["uint", "TYPE_UINT"],
          ["address", "TYPE_ADDRESS"],
          ["string", "TYPE_STRING"]
        ]),
        "TYPE"
      )
      .appendField(nameField, "NAME")
    this.setPreviousStatement(true, "contract_method_parameter")
    this.setNextStatement(true, "contract_method_parameter")
    this.setColour(320)
    this.contextMenu = false

    this.getVariableNameField = function() {
      return nameField
    }
    this.getVariableType = function() {
      return this.getFieldValue("TYPE")
    }
    this.getVariableGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_PARAMETER
    }
    this.getVariableScope = function() {
      var scope = this.getParent()
      while (
        !!scope &&
        (scope.type != "contract_method" && scope.type != "contract_ctor")
      ) {
        scope = scope.getParent()
      }
      return scope
    }

    Blockly.Extensions.apply("declare_typed_variable", this, false)
  }
}

Blockly.Blocks["contract_method_parameter_get"] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["select param...", Blockly.Solidity.UNDEFINED_NAME]
      ]),
      "PARAM_NAME"
    )
    this.setOutput(true, null)
    this.setColour(320)

    this.getVariableNameSelectField = function() {
      return this.getField("PARAM_NAME")
    }
    this.getVariableLabelGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_PARAMETER
    }
  }
}

Blockly.Blocks["contract_method"] = {
  init: function() {
    this.jsonInit({
      message0: "method %1 payable %2 returns %3",
      args0: [
        {
          type: "field_input",
          name: "NAME",
          text: "myMethod"
        },
        {
          type: "field_dropdown",
          name: "PAY",
          options: [["none", "EMPTY"], ["view", "VIEW"], ["payable", "PAY"]]
        },
        {
          type: "field_input",
          name: "RETURN",
          text: "",
          align: "RIGHT"
        }
      ],
      message1: "parameters %1",
      args1: [
        {
          type: "input_statement",
          name: "PARAMS",
          check: ["contract_method_parameter"],
          align: "RIGHT"
        }
      ],
      message2: "code %1",
      args2: [
        {
          type: "input_statement",
          name: "STACK",
          align: "RIGHT"
        }
      ],
      previousStatement: "contract_method",
      nextStatement: "contract_method",
      colour: 290,
      tooltip: "",
      helpUrl: ""
    })

    this.getVariableNameField = function() {
      return this.getField("NAME")
    }
    this.getVariableType = function() {
      return "void"
    }
    this.getVariableGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_METHOD
    }
    this.getVariableScope = function() {
      var scope = this.getParent()
      while (!!scope && scope.type != "contract") {
        scope = scope.getParent()
      }
      return scope
    }

    Blockly.Extensions.apply("declare_typed_variable", this, false)
  }
}

Blockly.Blocks["contract_method_call"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("call method")
      .appendField(
        new Blockly.FieldDropdown([
          ["select method...", Blockly.Solidity.UNDEFINED_NAME]
        ]),
        "METHOD_NAME"
      )
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    // this.setOutput(true, null);
    this.setColour(320)

    this.getVariableNameSelectField = function() {
      return this.getField("METHOD_NAME")
    }
    this.getVariableLabelGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_METHOD
    }

    this.setOnChange(function(event) {
      if (event.blockId != this.id) {
        return
      }

      if (event.element == "field" && event.name == "METHOD_NAME") {
        var methodId = this.getFieldValue("METHOD_NAME")
        var methodBlock = this.workspace.getBlockById(methodId)
        var params = []

        var block = methodBlock
        do {
          block = block.getChildren().filter(function(c) {
            return c.type == "contract_method_parameter"
          })[0]

          if (block) {
            params.push(block)
          }
        } while (block)

        console.log(params)
        // FIXME: add/remove inputs according to the method params
      }
    })
  }
}

Blockly.defineBlocksWithJsonArray([
  {
    type: "advertise_module_user",
    message0: "Advertise User Module",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "advertise_module_application",
    message0: "Advertise Business Logic Contract name %1 is %2",
    args0: [
      {
        type: "field_input",
        name: "Name",
        text: "AdvertiseLogic"
      },
      {
        type: "field_input",
        name: "INHERITANCE",
        check: "String",
        text: ""
      }
    ],
    message1: "User Contract %1 Ad Contract %2",
    args1: [
      {
        type: "field_input",
        name: "USER_NAME",
        align: "RIGHT",
        text: ""
      },
      {
        type: "field_input",
        name: "AD_NAME",
        align: "RIGHT",
        text: ""
      }
    ],
    message2: "Custom Code %1",
    args2: [
      {
        type: "input_statement",
        name: "Code"
      }
    ]
  }
])

Blockly.defineBlocksWithJsonArray([
  {
    type: "contract_ctor",
    message0: "constructor",
    message1: "parameters %1",
    args1: [
      {
        type: "input_statement",
        name: "PARAMS",
        check: "contract_method_parameter",
        align: "RIGHT"
      }
    ],
    message2: "code %1",
    args2: [
      {
        type: "input_statement",
        name: "STACK",
        align: "RIGHT"
      }
    ],
    previousStatement: ["contract_ctor"],
    colour: 290,
    tooltip: "",
    helpUrl: ""
  }
])

Blockly.defineBlocksWithJsonArray([
  {
    type: "contract_intrinsic_sha3",
    message0: "sha3 %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE"
      }
    ],
    output: null,
    colour: 60,
    tooltip: "",
    helpUrl: ""
  }
])

Blockly.defineBlocksWithJsonArray([
  {
    type: "user",
    message0: "User Block %1 is %2",
    args0: [
      {
        type: "field_input",
        name: "Name",
        text: "User"
      },
      {
        type: "field_input",
        name: "INHERITANCE",
        check: "String",
        text: ""
      }
    ],
    message1: "Custom Code %1",
    args1: [
      {
        type: "input_statement",
        name: "Code"
      }
    ]
  }
])

Blockly.defineBlocksWithJsonArray([
  {
    type: "auth",
    message0: "Auth Block %1",
    args0: [
      {
        type: "field_input",
        name: "Name",
        text: "Auth"
      }
    ],
    message1: "Custom Code %1",
    args1: [
      {
        type: "input_statement",
        name: "Code"
      }
    ]
  }
])

Blockly.defineBlocksWithJsonArray([
  {
    type: "advertise",
    message0: "Advertisement Block %1",
    args0: [
      {
        type: "field_input",
        name: "Name",
        text: "Advertise"
      }
    ],
    message1: "Custom Code %1",
    args1: [
      {
        type: "input_statement",
        name: "Code"
      }
    ]
  }
])

Blockly.Blocks["contract_mapping"] = {
  init: function() {
    this.jsonInit({
      message0: "%1 mapping %2 name %3",
      args0: [
        {
          type: "field_dropdown",
          name: "Key",
          options: [["int", "정수"], ["address", "주소"], ["string", "문자열"]]
        },
        {
          type: "field_input",
          name: "Value"
        },
        {
          type: "field_input",
          name: "Name",
          text: "map"
        }
      ],
      previousStatement: null,
      nextStatement: null
    })
  }
}

Blockly.Blocks["is_in_mapping"] = {
  init: function() {
    this.jsonInit({
      message0: "mapping name %1 One Dimensonal %2 Two Dimensonal %3",
      args0: [
        {
          type: "field_input",
          name: "NAME"
        },
        {
          type: "field_input",
          name: "ONE"
        },
        {
          type: "field_input",
          name: "TWO"
        }
      ],
      message1: "logic %1",
      args1: [
        {
          type: "input_statement",
          name: "Code"
        }
      ],
      previousStatement: null,
      nextStatement: null
    })
  }
}

Blockly.Blocks["controls_for"] = {
  init: function() {
    this.jsonInit({
      message0: "%{BKY_CONTROLS_FOR_TITLE}",
      args0: [
        {
          type: "field_input",
          name: "VAR",
          text: "i"
        },
        {
          type: "input_value",
          name: "FROM",
          check: "Number",
          align: "RIGHT"
        },
        {
          type: "input_value",
          name: "TO",
          check: "Number",
          align: "RIGHT"
        },
        {
          type: "input_value",
          name: "BY",
          check: "Number",
          align: "RIGHT"
        }
      ],
      message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
      args1: [
        {
          type: "input_statement",
          name: "DO"
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_LOOPS_HUE}",
      helpUrl: "%{BKY_CONTROLS_FOR_HELPURL}"
    })

    this.getVariableNameField = function() {
      return this.getField("VAR")
    }
    this.getVariableType = function() {
      return "TYPE_UINT"
    }
    this.getVariableGroup = function() {
      return Blockly.Solidity.LABEL_GROUP_VARIABLE
    }
    this.getVariableScope = function() {
      return this
    }

    Blockly.Extensions.apply("declare_typed_variable", this, false)
  }
}

Blockly.defineBlocksWithJsonArray([
  {
    type: "contract_struct",
    message0: "struct %1",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        check: "String",
        text: "MyStruct"
      }
    ],
    message1: "states %1",
    args1: [
      {
        type: "input_statement",
        name: "STATES",
        check: ["contract_state"],
        align: "RIGHT"
      }
    ],
    colour: 140,
    tooltip: "Declares a new struct.",
    nextStatement: "contract_state",
    previousStatement: "contract_state"
  }
])

Blockly.Blocks["contract_msg"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("msg.")
      .appendField(
        new Blockly.FieldDropdown([
          ["gas", "GAS"],
          ["sender", "SENDER"],
          ["data", "DATA"]
        ]),
        "VAR_GLOBAL"
      )

    this.setColour(195)
    // this.contextMenu = false;

    // this._stateNameInitialized = false;

    this.getVariableNameSelectField = function() {
      return this.getField("VAR_GLOBAL")
    }
    this.getVariableLabelGroup = function() {
      return this.getFieldValue("LABEL_GROUP_VARIABLE")
    }
    // this.getVariableScope = function() {
    //   var scope = this.getParent();
    //   while (!!scope && scope.type != 'contract') {
    //     scope = scope.getParent();
    //   }
    //   return scope;
    // };

    this.setOutput(true, null)

    // Blockly.Extensions.apply('declare_typed_variable', this, false);
  }
}

Blockly.Blocks["expression_expr"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("code")
      .appendField(new Blockly.FieldTextArea(""), "expr")
    this.setPreviousStatement(true)
    this.setColour(210)
  }
}
