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

goog.provide("goog.ui.AdvancedTooltipTest")
goog.setTestOnly("goog.ui.AdvancedTooltipTest")

goog.require("goog.dom")
goog.require("goog.dom.TagName")
goog.require("goog.events.Event")
goog.require("goog.events.EventType")
goog.require("goog.math.Box")
goog.require("goog.math.Coordinate")
goog.require("goog.style")
goog.require("goog.testing.MockClock")
goog.require("goog.testing.events")
goog.require("goog.testing.jsunit")
goog.require("goog.ui.AdvancedTooltip")
goog.require("goog.ui.Tooltip")
goog.require("goog.userAgent")

var att
var clock
var anchor
var elsewhere
var popup

var SHOWDELAY = 50
var HIDEDELAY = 250
var TRACKINGDELAY = 100

function isWindowTooSmall() {
  // Firefox 3 fails if the window is too small.
  return (
    goog.userAgent.GECKO &&
    (window.innerWidth < 350 || window.innerHeight < 100)
  )
}

function setUp() {
  popup = goog.dom.createDom(
    goog.dom.TagName.SPAN,
    { id: "popup", style: "position:absolute;top:300;left:300" },
    "Hello"
  )
  att = new goog.ui.AdvancedTooltip("hovertarget")
  att.setElement(popup)
  att.setCursorTracking(true)
  att.setHotSpotPadding(new goog.math.Box(10, 10, 10, 10))
  att.setShowDelayMs(SHOWDELAY)
  att.setHideDelayMs(HIDEDELAY)
  att.setCursorTrackingHideDelayMs(TRACKINGDELAY)
  att.setMargin(new goog.math.Box(300, 0, 0, 300))

  clock = new goog.testing.MockClock(true)

  anchor = goog.dom.getElement("hovertarget")
  elsewhere = goog.dom.getElement("notpopup")
}

function tearDown() {
  // tooltip needs to be hidden as well as disposed of so that it doesn't
  // leave global state hanging around to trip up other tests.
  if (att.isVisible()) {
    att.onHide()
  }
  att.dispose()
  clock.uninstall()
}

function assertVisible(msg, element) {
  if (element) {
    assertEquals(msg, "visible", element.style.visibility)
  } else {
    assertEquals("visible", msg.style.visibility)
  }
}

function assertHidden(msg, element) {
  if (element) {
    assertEquals(msg, "hidden", element.style.visibility)
  } else {
    assertEquals("hidden", msg.style.visibility)
  }
}

/**
 * Helper function to fire events related to moving a mouse from one element
 * to another. Fires mouseout, mouseover, and mousemove event.
 * @param {Element} from Element the mouse is moving from.
 * @param {Element} to Element the mouse is moving to.
 */
function fireMouseEvents(from, to) {
  goog.testing.events.fireMouseOutEvent(from, to)
  goog.testing.events.fireMouseOverEvent(to, from)
  var bounds = goog.style.getBounds(to)
  goog.testing.events.fireMouseMoveEvent(
    document,
    new goog.math.Coordinate(bounds.left + 1, bounds.top + 1)
  )
}

function testCursorTracking() {
  if (isWindowTooSmall()) {
    return
  }

  var oneThirdOfTheWay, twoThirdsOfTheWay

  oneThirdOfTheWay = new goog.math.Coordinate(100, 100)
  twoThirdsOfTheWay = new goog.math.Coordinate(200, 200)

  goog.testing.events.fireMouseOverEvent(anchor, elsewhere)
  clock.tick(SHOWDELAY)
  assertVisible("Mouse over anchor should show popup", popup)

  goog.testing.events.fireMouseOutEvent(anchor, elsewhere)
  goog.testing.events.fireMouseMoveEvent(document, oneThirdOfTheWay)
  clock.tick(HIDEDELAY)
  assertVisible("Moving mouse towards popup shouldn't hide it", popup)

  goog.testing.events.fireMouseMoveEvent(document, twoThirdsOfTheWay)
  goog.testing.events.fireMouseMoveEvent(document, oneThirdOfTheWay)
  clock.tick(TRACKINGDELAY)
  assertHidden("Moving mouse away from popup should hide it", popup)

  goog.testing.events.fireMouseMoveEvent(document, twoThirdsOfTheWay)
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, anchor)
  )
  clock.tick(SHOWDELAY)
  assertVisible("Set focus shows popup", popup)
  goog.testing.events.fireMouseMoveEvent(document, oneThirdOfTheWay)
  clock.tick(TRACKINGDELAY)
  assertHidden("Mouse move after focus should hide popup", popup)
}

function testPadding() {
  if (isWindowTooSmall()) {
    return
  }

  goog.testing.events.fireMouseOverEvent(anchor, elsewhere)
  clock.tick(SHOWDELAY)

  var attBounds = goog.style.getBounds(popup)
  var inPadding = new goog.math.Coordinate(
    attBounds.left - 5,
    attBounds.top - 5
  )
  var outOfPadding = new goog.math.Coordinate(
    attBounds.left - 15,
    attBounds.top - 15
  )

  fireMouseEvents(anchor, popup)
  goog.testing.events.fireMouseOutEvent(popup, elsewhere)
  goog.testing.events.fireMouseMoveEvent(document, inPadding)
  clock.tick(HIDEDELAY)
  assertVisible(
    "Mouse out of popup but within padding shouldn't hide it",
    popup
  )

  goog.testing.events.fireMouseMoveEvent(document, outOfPadding)
  clock.tick(HIDEDELAY)
  assertHidden("Mouse move beyond popup padding should hide it", popup)
}

function testAnchorWithChild() {
  var child = goog.dom.getElement("childtarget")

  fireMouseEvents(elsewhere, anchor)
  fireMouseEvents(anchor, child)
  clock.tick(SHOWDELAY)
  assertVisible("Mouse into child of anchor should still show popup", popup)

  fireMouseEvents(child, anchor)
  clock.tick(HIDEDELAY)
  assertVisible("Mouse from child to anchor should still show popup", popup)
}

function testNestedTooltip() {
  if (!isWindowTooSmall()) {
    checkNestedTooltips(false)
  }
}

function testNestedAdvancedTooltip() {
  if (!isWindowTooSmall()) {
    checkNestedTooltips(true)
  }
}

function testResizingTooltipWhileShown() {
  fireMouseEvents(elsewhere, anchor)
  clock.tick(SHOWDELAY)
  popup.style.height = "100px"
  var attBounds = goog.style.getBounds(popup)
  var inPadding = new goog.math.Coordinate(
    attBounds.left + 5,
    attBounds.top + attBounds.height + 5
  )
  var outOfPadding = new goog.math.Coordinate(
    attBounds.left + 5,
    attBounds.top + attBounds.height + 15
  )

  fireMouseEvents(anchor, popup)
  goog.testing.events.fireMouseOutEvent(popup, elsewhere)
  goog.testing.events.fireMouseMoveEvent(document, inPadding)
  clock.tick(HIDEDELAY)
  assertVisible(
    "Mouse out of popup but within padding shouldn't hide it",
    popup
  )

  goog.testing.events.fireMouseMoveEvent(document, outOfPadding)
  clock.tick(HIDEDELAY)
  assertHidden("Mouse move beyond popup padding should hide it", popup)
}

function checkNestedTooltips(useAdvancedTooltip) {
  popup.appendChild(
    goog.dom.createDom(
      goog.dom.TagName.SPAN,
      { id: "nestedAnchor" },
      "Nested Anchor"
    )
  )
  var nestedAnchor = goog.dom.getElement("nestedAnchor")
  var nestedTooltip
  if (useAdvancedTooltip) {
    nestedTooltip = new goog.ui.AdvancedTooltip(nestedAnchor, "popup")
  } else {
    nestedTooltip = new goog.ui.Tooltip(nestedAnchor, "popup")
  }
  var nestedPopup = nestedTooltip.getElement()
  nestedTooltip.setShowDelayMs(SHOWDELAY)
  nestedTooltip.setHideDelayMs(HIDEDELAY)

  fireMouseEvents(elsewhere, anchor)
  clock.tick(SHOWDELAY)
  fireMouseEvents(anchor, popup)
  fireMouseEvents(popup, nestedAnchor)
  clock.tick(SHOWDELAY + HIDEDELAY)
  assertVisible("Mouse into nested anchor should show popup", nestedPopup)
  assertVisible("Mouse into nested anchor should not hide parent", popup)
  fireMouseEvents(nestedAnchor, elsewhere)
  clock.tick(HIDEDELAY)
  assertHidden("Mouse out of nested popup should hide it", nestedPopup)
  clock.tick(HIDEDELAY)
  assertHidden("Mouse out of nested popup should eventually hide parent", popup)

  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, anchor)
  )
  clock.tick(SHOWDELAY)
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.BLUR, anchor)
  )
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, nestedAnchor)
  )
  clock.tick(SHOWDELAY + HIDEDELAY)
  assertVisible("Moving focus to child anchor doesn't hide parent", popup)
  assertVisible("Set focus shows nested popup", nestedPopup)

  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.BLUR, nestedAnchor)
  )
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, anchor)
  )
  clock.tick(HIDEDELAY + HIDEDELAY)
  assertHidden("Lose focus hides nested popup", nestedPopup)
  assertVisible(
    "Moving focus from nested anchor to parent doesn't hide parent",
    popup
  )

  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.BLUR, anchor)
  )
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, nestedAnchor)
  )
  clock.tick(SHOWDELAY)
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.BLUR, nestedAnchor)
  )
  clock.tick(HIDEDELAY)
  assertHidden("Lose focus hides nested popup", nestedPopup)
  clock.tick(HIDEDELAY)
  assertHidden("Nested anchor losing focus hides parent", popup)

  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, anchor)
  )
  clock.tick(SHOWDELAY)
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.BLUR, anchor)
  )
  goog.testing.events.fireBrowserEvent(
    new goog.events.Event(goog.events.EventType.FOCUS, nestedAnchor)
  )
  clock.tick(SHOWDELAY)
  var coordElsewhere = new goog.math.Coordinate(1, 1)
  goog.testing.events.fireMouseMoveEvent(document, coordElsewhere)
  clock.tick(HIDEDELAY)
  assertHidden("Mouse move should hide parent with active child", popup)
  assertHidden("Mouse move should hide nested popup", nestedPopup)
}
