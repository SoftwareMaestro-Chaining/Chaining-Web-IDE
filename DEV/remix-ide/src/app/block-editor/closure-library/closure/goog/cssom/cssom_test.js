// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide("goog.cssomTest");
goog.setTestOnly("goog.cssomTest");

goog.require("goog.array");
goog.require("goog.cssom");
goog.require("goog.cssom.CssRuleType");
goog.require("goog.testing.jsunit");
goog.require("goog.userAgent");

// Since sheet cssom_test1.css's first line is to import
// cssom_test2.css, we should get 2 before one in the string.
var cssText =
  ".css-link-1 { display: block; } " +
  ".css-import-2 { display: block; } " +
  ".css-import-1 { display: block; } " +
  ".css-style-1 { display: block; } " +
  ".css-style-2 { display: block; } " +
  ".css-style-3 { display: block; }";

var replacementCssText = ".css-repl-1 { display: block; }";

var isIe7 =
  goog.userAgent.IE &&
  goog.userAgent.compare(goog.userAgent.VERSION, "7.0") == 0;

// We're going to toLowerCase cssText before testing, because IE returns
// CSS property names in UPPERCASE, and the function shouldn't
// "fix" the text as it would be expensive and rarely of use.
// Same goes for the trailing whitespace in IE.
// Same goes for fixing the optimized removal of trailing ; in rules.
// Also needed for Opera.
function fixCssTextForIe(cssText) {
  cssText = cssText.toLowerCase().replace(/\s*$/, "");
  if (cssText.match(/[^;] \}/)) {
    cssText = cssText.replace(/([^;]) \}/g, "$1; }");
  }
  return cssText;
}

function testGetFileNameFromStyleSheet() {
  var styleSheet = { href: "http://foo.com/something/filename.css" };
  assertEquals(
    "filename.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheet)
  );

  styleSheet = { href: "https://foo.com:123/something/filename.css" };
  assertEquals(
    "filename.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheet)
  );

  styleSheet = { href: "http://foo.com/something/filename.css?bar=bas" };
  assertEquals(
    "filename.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheet)
  );

  styleSheet = { href: "filename.css?bar=bas" };
  assertEquals(
    "filename.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheet)
  );

  styleSheet = { href: "filename.css" };
  assertEquals(
    "filename.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheet)
  );
}

function testGetAllCssStyleSheets() {
  var styleSheets = goog.cssom.getAllCssStyleSheets();
  assertEquals(4, styleSheets.length);
  // Makes sure they're in the right cascade order.
  assertEquals(
    "cssom_test_link_1.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheets[0])
  );
  assertEquals(
    "cssom_test_import_2.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheets[1])
  );
  assertEquals(
    "cssom_test_import_1.css",
    goog.cssom.getFileNameFromStyleSheet(styleSheets[2])
  );
  // Not an external styleSheet
  assertNull(goog.cssom.getFileNameFromStyleSheet(styleSheets[3]));
}

function testGetAllCssText() {
  var allCssText = goog.cssom.getAllCssText();
  // In IE7, a CSSRule object gets included twice and replaces another
  // existing CSSRule object. We aren't using
  // goog.testing.ExpectedFailures since it brings in additional CSS
  // which breaks a lot of our expectations about the number of rules
  // present in a style sheet.
  if (!isIe7) {
    assertEquals(cssText, fixCssTextForIe(allCssText));
  }
}

function testGetAllCssStyleRules() {
  var allCssRules = goog.cssom.getAllCssStyleRules();
  assertEquals(6, allCssRules.length);
}

function testAddCssText() {
  var newCssText = ".css-add-1 { display: block; }";
  var newCssNode = goog.cssom.addCssText(newCssText);

  assertEquals(document.styleSheets.length, 3);

  var allCssText = goog.cssom.getAllCssText();

  // In IE7, a CSSRule object gets included twice and replaces another
  // existing CSSRule object. We aren't using
  // goog.testing.ExpectedFailures since it brings in additional CSS
  // which breaks a lot of our expectations about the number of rules
  // present in a style sheet.
  if (!isIe7) {
    // Opera inserts the CSSRule to the first position. And fixCssText
    // is also needed to clean up whitespace.
    if (goog.userAgent.OPERA) {
      assertEquals(newCssText + " " + cssText, fixCssTextForIe(allCssText));
    } else {
      assertEquals(cssText + " " + newCssText, fixCssTextForIe(allCssText));
    }
  }

  var cssRules = goog.cssom.getAllCssStyleRules();
  assertEquals(7, cssRules.length);

  // Remove the new stylesheet now so it doesn't interfere with other
  // tests.
  newCssNode.parentNode.removeChild(newCssNode);
  // Sanity check.
  cssRules = goog.cssom.getAllCssStyleRules();
  assertEquals(6, cssRules.length);
}

function testAddCssRule() {
  // test that addCssRule correctly adds the rule to the style
  // sheet.
  var styleSheets = goog.cssom.getAllCssStyleSheets();
  var styleSheet = styleSheets[3];
  var newCssRule = ".css-addCssRule { display: block; }";
  var rules = styleSheet.rules || styleSheet.cssRules;
  var origNumberOfRules = rules.length;

  goog.cssom.addCssRule(styleSheet, newCssRule, 1);

  rules = styleSheet.rules || styleSheet.cssRules;
  var newNumberOfRules = rules.length;
  assertEquals(newNumberOfRules, origNumberOfRules + 1);

  // Remove the added rule so we don't mess up other tests.
  goog.cssom.removeCssRule(styleSheet, 1);
}

function testAddCssRuleAtPos() {
  // test that addCssRule correctly adds the rule to the style
  // sheet at the specified position.
  var styleSheets = goog.cssom.getAllCssStyleSheets();
  var styleSheet = styleSheets[3];
  var newCssRule = ".css-addCssRulePos { display: block; }";
  var rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var origNumberOfRules = rules.length;

  // Firefox croaks if we try to insert a CSSRule at an index that
  // contains a CSSImport Rule. Since we deal only with CSSStyleRule
  // objects, we find the first CSSStyleRule and return its index.
  //
  // NOTE(user): We could have unified the code block below for all
  // browsers but IE6 horribly mangled up the stylesheet by creating
  // duplicate instances of a rule when removeCssRule was invoked
  // just after addCssRule with the looping construct in. This is
  // perfectly fine since IE's styleSheet.rules does not contain
  // references to anything but CSSStyleRules.
  var pos = 0;
  if (styleSheet.cssRules) {
    pos = goog.array.findIndex(rules, function(rule) {
      return rule.type == goog.cssom.CssRuleType.STYLE;
    });
  }
  goog.cssom.addCssRule(styleSheet, newCssRule, pos);

  rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var newNumberOfRules = rules.length;
  assertEquals(newNumberOfRules, origNumberOfRules + 1);

  // Remove the added rule so we don't mess up other tests.
  goog.cssom.removeCssRule(styleSheet, pos);

  rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  assertEquals(origNumberOfRules, rules.length);
}

function testAddCssRuleNoIndex() {
  // How well do we handle cases where the optional index is
  //  not passed in?
  var styleSheets = goog.cssom.getAllCssStyleSheets();
  var styleSheet = styleSheets[3];
  var rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var origNumberOfRules = rules.length;
  var newCssRule = ".css-addCssRuleNoIndex { display: block; }";

  // Try inserting the rule without specifying an index.
  // Make sure we don't throw an exception, and that we added
  // the entry.
  goog.cssom.addCssRule(styleSheet, newCssRule);

  rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var newNumberOfRules = rules.length;
  assertEquals(newNumberOfRules, origNumberOfRules + 1);

  // Remove the added rule so we don't mess up the other tests.
  goog.cssom.removeCssRule(styleSheet, newNumberOfRules - 1);

  rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  assertEquals(origNumberOfRules, rules.length);
}

function testGetParentStyleSheetAfterGetAllCssStyleRules() {
  var cssRules = goog.cssom.getAllCssStyleRules();
  var cssRule = cssRules[4];
  var parentStyleSheet = goog.cssom.getParentStyleSheet(cssRule);
  var styleSheets = goog.cssom.getAllCssStyleSheets();
  var styleSheet = styleSheets[3];
  assertEquals(styleSheet, parentStyleSheet);
}

function testGetCssRuleIndexInParentStyleSheetAfterGetAllCssStyleRules() {
  var cssRules = goog.cssom.getAllCssStyleRules();
  var cssRule = cssRules[4];
  // Note here that this is correct - IE's styleSheet.rules does not
  // contain references to anything but CSSStyleRules while FF and others
  // include anything that inherits from the CSSRule interface.
  // See http://dev.w3.org/csswg/cssom/#cssrule.
  var parentStyleSheet = goog.cssom.getParentStyleSheet(cssRule);
  var ruleIndex = goog.isDefAndNotNull(parentStyleSheet.cssRules) ? 2 : 1;
  assertEquals(
    ruleIndex,
    goog.cssom.getCssRuleIndexInParentStyleSheet(cssRule)
  );
}

function testGetCssRuleIndexInParentStyleSheetNonStyleRule() {
  // IE's styleSheet.rules only contain CSSStyleRules.
  if (!goog.userAgent.IE) {
    var styleSheets = goog.cssom.getAllCssStyleSheets();
    var styleSheet = styleSheets[3];
    var newCssRule = "@media print { .css-nonStyle { display: block; } }";
    goog.cssom.addCssRule(styleSheet, newCssRule);
    var rules = styleSheet.rules || styleSheet.cssRules;
    var cssRule = rules[rules.length - 1];
    assertEquals(goog.cssom.CssRuleType.MEDIA, cssRule.type);
    // Make sure we don't throw an exception.
    goog.cssom.getCssRuleIndexInParentStyleSheet(cssRule, styleSheet);
    // Remove the added rule.
    goog.cssom.removeCssRule(styleSheet, rules.length - 1);
  }
}

// Tests the scenario where we have a known stylesheet and index.
function testReplaceCssRuleWithStyleSheetAndIndex() {
  var styleSheets = goog.cssom.getAllCssStyleSheets();
  var styleSheet = styleSheets[3];
  var rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var index = 2;
  var origCssRule = rules[index];
  var origCssText = fixCssTextForIe(
    goog.cssom.getCssTextFromCssRule(origCssRule)
  );

  goog.cssom.replaceCssRule(origCssRule, replacementCssText, styleSheet, index);

  var rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var newCssRule = rules[index];
  var newCssText = goog.cssom.getCssTextFromCssRule(newCssRule);
  assertEquals(replacementCssText, fixCssTextForIe(newCssText));

  // Now we need to re-replace our rule, to preserve parity for the other
  // tests.
  goog.cssom.replaceCssRule(newCssRule, origCssText, styleSheet, index);
  var rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var nowCssRule = rules[index];
  var nowCssText = goog.cssom.getCssTextFromCssRule(nowCssRule);
  assertEquals(origCssText, fixCssTextForIe(nowCssText));
}

function testReplaceCssRuleUsingGetAllCssStyleRules() {
  var cssRules = goog.cssom.getAllCssStyleRules();
  var origCssRule = cssRules[4];
  var origCssText = fixCssTextForIe(
    goog.cssom.getCssTextFromCssRule(origCssRule)
  );
  // notice we don't pass in the stylesheet or index.
  goog.cssom.replaceCssRule(origCssRule, replacementCssText);

  var styleSheets = goog.cssom.getAllCssStyleSheets();
  var styleSheet = styleSheets[3];
  var rules = goog.cssom.getCssRulesFromStyleSheet(styleSheet);
  var index = goog.isDefAndNotNull(styleSheet.cssRules) ? 2 : 1;
  var newCssRule = rules[index];
  var newCssText = fixCssTextForIe(
    goog.cssom.getCssTextFromCssRule(newCssRule)
  );
  assertEquals(replacementCssText, newCssText);

  // try getting it the other way around too.
  var cssRules = goog.cssom.getAllCssStyleRules();
  var newCssRule = cssRules[4];
  var newCssText = fixCssTextForIe(
    goog.cssom.getCssTextFromCssRule(newCssRule)
  );
  assertEquals(replacementCssText, newCssText);

  // Now we need to re-replace our rule, to preserve parity for the other
  // tests.
  goog.cssom.replaceCssRule(newCssRule, origCssText);
  var cssRules = goog.cssom.getAllCssStyleRules();
  var nowCssRule = cssRules[4];
  var nowCssText = fixCssTextForIe(
    goog.cssom.getCssTextFromCssRule(nowCssRule)
  );
  assertEquals(origCssText, nowCssText);
}
