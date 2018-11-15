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

    function addBalance() payable onlyOwner {
        if(msg.sender != owner_address) revert();
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

    function isAvailableReward(uint _views) public view returns(bool){
        if(_views < minimumViews) {
            return false;
        } else {
            return true;
        }
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

Blockly.Solidity["advertise_module_user"] = function(block) {
  let code = `
    uint views;
    
    constructor(address _address) public {
        setAddress(_address);
    }
    
    function setViews(uint _views) public {
        views = _views;
    }
    
    function getView() public view returns(uint) {
        return views;
    }
    
    function getReward(uint money) public returns (uint) {
        return money;
    }
    `
  return code
}

Blockly.Solidity["advertise_module_application"] = function(block) {
  let user_contract = block.getFieldValue("USER_NAME")
  let ad_contract = block.getFieldValue("AD_NAME")
  let logic_name = block.getFieldValue("Name")

  let inheritance = block.getFieldValue("INHERITANCE")

  let isIn = ""
  if (inheritance == "") {
    isIn = ""
  } else {
    isIn = " is " + inheritance
  }

  let code = `
contract ${logic_name} ${isIn} {  
    mapping(address => ${ad_contract}[]) public advertises;
    mapping(uint => ${user_contract}[]) public member; // advertise pk -> user
    
    function addAdvertise(string _url, string _name, uint _advertiseLength, uint _minimumViews, uint _ratioViews) onlyOwner {

        address adminAddress = getAdminAddress();
        uint length = advertises[adminAddress].length;
        
        ${ad_contract} ad = new ${ad_contract}(length, _url, _name, _advertiseLength, _minimumViews, _ratioViews);
        advertises[adminAddress].push(ad);
    }
    
    function registerMember(uint advertiseIndex) public {
        require(!isMember(advertiseIndex));
        ${user_contract} customer = new ${user_contract}(msg.sender);
        member[advertiseIndex].push(customer);
    }

    function getCurrentAddress() public view returns(address) {
        return msg.sender;
    }

    // verify that registerd user of ad
    function isMember(uint advertiseIndex) public view returns(bool) {
        uint length = member[advertiseIndex].length;
        bool _isMember = false;
        for(uint i=0; i< length; i++) {
            ${user_contract} _customer = member[advertiseIndex][i];
            if(_customer.getAddress() == msg.sender) {
                _isMember = true;
                break;
            }
        }
        return _isMember;
    }
    
    
    function getAdvertiseCount() public view returns(uint) {
        return advertises[getAdminAddress()].length;
    }
    
    function getMemberCount(uint advertiseIndex) public view returns(uint) {
        return member[advertiseIndex].length;
    }
    
    // get member info of advertise
    function getMember(uint advertiseIndex) public view returns(${user_contract} _customer) {
        uint length = member[advertiseIndex].length;
        require(isMember(advertiseIndex));
        ${user_contract} customer;
        for(uint i=0; i<length; i++) {
            customer = member[advertiseIndex][i];
            if(customer.getAddress() == msg.sender) {
                break;
            }
        }
        return customer;
    }
    
    function getAdvertiseName (uint advertiseIndex) public view returns(string) {
        return advertises[getAdminAddress()][advertiseIndex].getName();
    }
    
    function getAdvertise(uint advertiseIndex) public view returns(${ad_contract} _advertise) {
        return advertises[getAdminAddress()][advertiseIndex];
    }
    
    function getCurrentViews(uint advertiseIndex, uint views) public view returns(uint){
        ${user_contract} _customer = getMember(advertiseIndex);
        uint accumulateViews = _customer.getView();
        return views - accumulateViews;
    }
    
    function getReward(uint advertiseIndex, uint views) {
        uint currentViews = getCurrentViews(advertiseIndex, views);
        Advertise _advertise = getAdvertise(advertiseIndex);
        uint minimumViews = _advertise.getMinimumViews();
    }
    
    function getMemberAddress(uint advertiseIndex, uint userIndex) public view returns(address) {
        return member[advertiseIndex][userIndex].getAddress();
    }

    function checkAdvertiseBalance() public view returns(uint){
        return address(this).balance;
    }    
}
    `

  return code
}
