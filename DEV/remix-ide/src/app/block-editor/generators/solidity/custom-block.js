/*
 * @fileoverview Helper functions for generating Solidity for blocks.
 * @author jeanmarc.leroux@google.com (Jean-Marc Le Roux)
 */
"use strict"

goog.require("Blockly.Solidity")

Blockly.Solidity["user"] = function(block) {
  let name = block.getFieldValue("Name")

  let custom_code = Blockly.Solidity.statementToCode(block, "Code")

  let inheritance = block.getFieldValue("INHERITANCE")

  let isIn = ""
  if (inheritance == "") {
    isIn = ""
  } else {
    isIn = " is " + inheritance
  }

  let code = `
contract ${name} ${isIn} {
    
    address public user_address;

    function setAddress(address _address) public { 
        user_address = _address; 
    }
   
    function getAddress() public view returns(address) {
        return user_address;
    }

    ${custom_code}
}
  `
  return code
}

Blockly.Solidity["auth"] = function(block) {
  let name = block.getFieldValue("Name")
  let custom_code = Blockly.Solidity.statementToCode(block, "Code")

  let code = `
contract ${name} {

    address public owner_address;

    constructor() public {
        owner_address = msg.sender;
    }

    modifier onlyOwner {
        if(msg.sender != owner_address) revert();
        _;
    }

    function getAdminAddress() public view returns(address){
        return owner_address;
    }
    
    function kill() onlyOwner public {
        selfdestruct(owner_address);
    }

    ${custom_code}
}
  `
  return code
}

Blockly.Solidity["advertise"] = function(block) {
  let name = block.getFieldValue("Name")
  let custom_code = Blockly.Solidity.statementToCode(block, "Code")

  let code = `
contract ${name} {
    uint index;
    string url;
    string name;
    uint advertiseLength;
    uint minimumViews;
    uint rewardRatio;
    
    constructor(uint _index, string _url, string _name, uint _advertiseLength, uint _minimumViews, uint _rewardRatio) public {
        index = _index;
        url = _url;
        name = _name;
        advertiseLength = _advertiseLength;
        minimumViews = _minimumViews;
        rewardRatio = _rewardRatio;
    }
    
    function getMinimumViews() public view returns(uint) {
        return minimumViews;
    }
    
    function getAdvertiseLength() public view returns(uint) {
        return advertiseLength;
    }
    
    function getRewardRatio() public view returns(uint) {
        return rewardRatio;
    }
    
    function getUrl() public view returns(string) {
        return url;
    }
    
    function getIndex() public view returns(uint) {
        return index;
    }
    
    function getName() public view returns(string) {
        return name;
    }    

    ${custom_code}
}

`
  return code
}

Blockly.Solidity["is_in_mapping"] = function(block) {
  let one = block.getFieldValue("ONE")
  let two = block.getFieldValue("TWO")
  let name = block.getFieldValue("NAME")

  let logic = Blockly.Solidity.statementToCode(block, "Code")

  let code

  if (two != "") {
    code = `
  uint length = ${name}[${two}].length;
  for(uint i=0; i<length; i++) {
    ${logic}
  }
  `
  } else {
    code = `
  uint length = ${name}.length;
  for(uint i=0; i<length; i++) {
    ${logic}
  }      
  `
  }
  return code
}

Blockly.Solidity["contract_mapping"] = function(block) {
  let key = block.getFieldValue("Key")
  let value = block.getFieldValue("Value")
  let name = block.getFieldValue("Name")

  let types = {
    정수: "uint",
    주소: "address",
    문자열: "string"
  }

  if (value == "") {
    return ""
  } else {
    return "mapping(" + types[key] + " => " + value + ") public " + name + ";"
  }
}
