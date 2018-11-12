/*
 * @fileoverview Helper functions for generating Solidity for blocks.
 * @author jeanmarc.leroux@google.com (Jean-Marc Le Roux)
 */
"use strict"

goog.require("Blockly.Solidity")

Blockly.Solidity["user"] = function(block) {
  let code =
    "contract User {\n" +
    "   \taddress public user_address; \n\n" +
    "   \tfunction setAddress(address _address) public { \n" +
    "       \t\tuser_address = _address; \n" +
    "   \t}\n\n" +
    "   \tfunction getAddress() public view returns(address) {\n" +
    "       \t\treturn user_address;\n" +
    "   \t}\n" +
    "}"

  return code
}
