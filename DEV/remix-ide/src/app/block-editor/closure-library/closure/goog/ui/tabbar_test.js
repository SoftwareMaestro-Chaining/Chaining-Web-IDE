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

goog.provide("goog.ui.TabBarTest")
goog.setTestOnly("goog.ui.TabBarTest")

goog.require("goog.dom")
goog.require("goog.events")
goog.require("goog.events.Event")
goog.require("goog.events.EventType")
goog.require("goog.events.KeyCodes")
goog.require("goog.testing.jsunit")
goog.require("goog.ui.Component")
goog.require("goog.ui.Container")
goog.require("goog.ui.Tab")
goog.require("goog.ui.TabBar")
goog.require("goog.ui.TabBarRenderer")

var sandbox
var tabBar

// Fake keyboard event object.
function FakeKeyEvent(keyCode) {
  this.keyCode = keyCode
  this.defaultPrevented = false
  this.propagationStopped = false
}
FakeKeyEvent.prototype.preventDefault = function() {
  this.defaultPrevented = true
}
FakeKeyEvent.prototype.stopPropagation = function() {
  this.propagationStopped = true
}

function setUp() {
  sandbox = goog.dom.getElement("sandbox")
  tabBar = new goog.ui.TabBar()
}

function tearDown() {
  tabBar.dispose()
  goog.dom.removeChildren(sandbox)
}

function testConstructor() {
  assertNotNull("Tab bar must not be null", tabBar)
  assertEquals(
    "Tab bar renderer must default to expected value",
    goog.ui.TabBarRenderer.getInstance(),
    tabBar.getRenderer()
  )
  assertEquals(
    "Tab bar location must default to expected value",
    goog.ui.TabBar.Location.TOP,
    tabBar.getLocation()
  )
  assertEquals(
    "Tab bar orientation must default to expected value",
    goog.ui.Container.Orientation.HORIZONTAL,
    tabBar.getOrientation()
  )

  var fakeRenderer = {}
  var fakeDomHelper = {}
  var bar = new goog.ui.TabBar(
    goog.ui.TabBar.Location.START,
    fakeRenderer,
    fakeDomHelper
  )
  assertNotNull("Tab bar must not be null", bar)
  assertEquals(
    "Tab bar renderer must have expected value",
    fakeRenderer,
    bar.getRenderer()
  )
  assertEquals(
    "Tab bar DOM helper must have expected value",
    fakeDomHelper,
    bar.getDomHelper()
  )
  assertEquals(
    "Tab bar location must have expected value",
    goog.ui.TabBar.Location.START,
    bar.getLocation()
  )
  assertEquals(
    "Tab bar orientation must have expected value",
    goog.ui.Container.Orientation.VERTICAL,
    bar.getOrientation()
  )
  bar.dispose()
}

function testDispose() {
  // Set tabBar.selectedTab_ to something non-null, just to test dispose().
  tabBar.selectedTab_ = {}
  assertNotNull("Selected tab must be non-null", tabBar.getSelectedTab())
  assertFalse("Tab bar must not have been disposed of", tabBar.isDisposed())
  tabBar.dispose()
  assertNull("Selected tab must be null", tabBar.getSelectedTab())
  assertTrue("Tab bar must have been disposed of", tabBar.isDisposed())
}

function testAddRemoveChild() {
  assertNull("No tab must be selected", tabBar.getSelectedTab())

  var first = new goog.ui.Tab("First")
  tabBar.addChild(first)
  assertEquals(
    "First tab must have been added at the expected index",
    0,
    tabBar.indexOfChild(first)
  )
  first.setSelected(true)
  assertEquals("First tab must be selected", 0, tabBar.getSelectedTabIndex())

  var second = new goog.ui.Tab("Second")
  tabBar.addChild(second)
  assertEquals(
    "Second tab must have been added at the expected index",
    1,
    tabBar.indexOfChild(second)
  )
  assertEquals(
    "First tab must remain selected",
    0,
    tabBar.getSelectedTabIndex()
  )

  var firstRemoved = tabBar.removeChild(first)
  assertEquals("removeChild() must return the removed tab", first, firstRemoved)
  assertEquals(
    "First tab must no longer be in the tab bar",
    -1,
    tabBar.indexOfChild(first)
  )
  assertEquals(
    "Second tab must be at the expected index",
    0,
    tabBar.indexOfChild(second)
  )
  assertFalse("First tab must no longer be selected", first.isSelected())
  assertTrue("Remaining tab must be selected", second.isSelected())

  var secondRemoved = tabBar.removeChild(second)
  assertEquals(
    "removeChild() must return the removed tab",
    second,
    secondRemoved
  )
  assertFalse("Tab must no longer be selected", second.isSelected())
  assertNull("No tab must be selected", tabBar.getSelectedTab())
}

function testGetSetLocation() {
  assertEquals(
    "Location must default to TOP",
    goog.ui.TabBar.Location.TOP,
    tabBar.getLocation()
  )
  tabBar.setLocation(goog.ui.TabBar.Location.START)
  assertEquals(
    "Location must have expected value",
    goog.ui.TabBar.Location.START,
    tabBar.getLocation()
  )
  tabBar.createDom()
  assertThrows(
    "Attempting to change the location after the tab bar has " +
      "been rendered must throw error",
    function() {
      tabBar.setLocation(goog.ui.TabBar.Location.BOTTOM)
    }
  )
}

function testIsSetAutoSelectTabs() {
  assertTrue(
    "Tab bar must auto-select tabs by default",
    tabBar.isAutoSelectTabs()
  )
  tabBar.setAutoSelectTabs(false)
  assertFalse(
    "Tab bar must no longer auto-select tabs by default",
    tabBar.isAutoSelectTabs()
  )
  tabBar.render(sandbox)
  assertFalse(
    "Rendering must not change auto-select setting",
    tabBar.isAutoSelectTabs()
  )
  tabBar.setAutoSelectTabs(true)
  assertTrue(
    "Tab bar must once again auto-select tabs",
    tabBar.isAutoSelectTabs()
  )
}

function setHighlightedIndexFromKeyEvent() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  // Verify baseline assumptions.
  assertNull("No tab must be highlighted", tabBar.getHighlighted())
  assertNull("No tab must be selected", tabBar.getSelectedTab())
  assertTrue(
    "Tab bar must auto-select tabs on keyboard highlight",
    tabBar.isAutoSelectTabs()
  )

  // Highlight and selection must move together.
  tabBar.setHighlightedIndexFromKeyEvent(0)
  assertTrue("Foo must be highlighted", foo.isHighlighted())
  assertTrue("Foo must be selected", foo.isSelected())

  // Highlight and selection must move together.
  tabBar.setHighlightedIndexFromKeyEvent(1)
  assertFalse("Foo must no longer be highlighted", foo.isHighlighted())
  assertFalse("Foo must no longer be selected", foo.isSelected())
  assertTrue("Bar must be highlighted", bar.isHighlighted())
  assertTrue("Bar must be selected", bar.isSelected())

  // Turn off auto-select-on-keyboard-highlight.
  tabBar.setAutoSelectTabs(false)

  // Selection must not change; only highlight should move.
  tabBar.setHighlightedIndexFromKeyEvent(2)
  assertFalse("Bar must no longer be highlighted", bar.isHighlighted())
  assertTrue("Bar must remain selected", bar.isSelected())
  assertTrue("Baz must be highlighted", baz.isHighlighted())
  assertFalse("Baz must not be selected", baz.isSelected())
}

function testGetSetSelectedTab() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  assertNull("No tab must be selected", tabBar.getSelectedTab())

  tabBar.setSelectedTab(baz)
  assertTrue("Baz must be selected", baz.isSelected())
  assertEquals("Baz must be the selected tab", baz, tabBar.getSelectedTab())

  tabBar.setSelectedTab(foo)
  assertFalse("Baz must no longer be selected", baz.isSelected())
  assertTrue("Foo must be selected", foo.isSelected())
  assertEquals("Foo must be the selected tab", foo, tabBar.getSelectedTab())

  tabBar.setSelectedTab(foo)
  assertTrue("Foo must remain selected", foo.isSelected())
  assertEquals("Foo must remain the selected tab", foo, tabBar.getSelectedTab())

  tabBar.setSelectedTab(null)
  assertFalse("Foo must no longer be selected", foo.isSelected())
  assertNull("No tab must be selected", tabBar.getSelectedTab())
}

function testGetSetSelectedTabIndex() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChildAt((foo = new goog.ui.Tab("foo")), 0)
  tabBar.addChildAt((bar = new goog.ui.Tab("bar")), 1)
  tabBar.addChildAt((baz = new goog.ui.Tab("baz")), 2)

  assertEquals("No tab must be selected", -1, tabBar.getSelectedTabIndex())

  tabBar.setSelectedTabIndex(2)
  assertTrue("Baz must be selected", baz.isSelected())
  assertEquals("Baz must be the selected tab", 2, tabBar.getSelectedTabIndex())

  tabBar.setSelectedTabIndex(0)
  assertFalse("Baz must no longer be selected", baz.isSelected())
  assertTrue("Foo must be selected", foo.isSelected())
  assertEquals("Foo must be the selected tab", 0, tabBar.getSelectedTabIndex())

  tabBar.setSelectedTabIndex(0)
  assertTrue("Foo must remain selected", foo.isSelected())
  assertEquals(
    "Foo must remain the selected tab",
    0,
    tabBar.getSelectedTabIndex()
  )

  tabBar.setSelectedTabIndex(-1)
  assertFalse("Foo must no longer be selected", foo.isSelected())
  assertEquals("No tab must be selected", -1, tabBar.getSelectedTabIndex())
}

function testDeselectIfSelected() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  // Start with the middle tab selected.
  bar.setSelected(true)
  assertTrue("Bar must be selected", bar.isSelected())
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())

  // Should be a no-op.
  tabBar.deselectIfSelected(null)
  assertTrue("Bar must remain selected", bar.isSelected())
  assertEquals("Bar must remain the selected tab", bar, tabBar.getSelectedTab())

  // Should be a no-op.
  tabBar.deselectIfSelected(foo)
  assertTrue("Bar must remain selected", bar.isSelected())
  assertEquals("Bar must remain the selected tab", bar, tabBar.getSelectedTab())

  // Should deselect bar and select the previous tab (foo).
  tabBar.deselectIfSelected(bar)
  assertFalse("Bar must no longer be selected", bar.isSelected())
  assertTrue("Foo must be selected", foo.isSelected())
  assertEquals("Foo must be the selected tab", foo, tabBar.getSelectedTab())

  // Should deselect foo and select the next tab (bar).
  tabBar.deselectIfSelected(foo)
  assertFalse("Foo must no longer be selected", foo.isSelected())
  assertTrue("Bar must be selected", bar.isSelected())
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())
}

function testHandleTabSelect() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  assertNull("No tab must be selected", tabBar.getSelectedTab())

  tabBar.handleTabSelect(
    new goog.events.Event(goog.ui.Component.EventType.SELECT, bar)
  )
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())

  tabBar.handleTabSelect(
    new goog.events.Event(goog.ui.Component.EventType.SELECT, bar)
  )
  assertEquals("Bar must remain selected tab", bar, tabBar.getSelectedTab())

  tabBar.handleTabSelect(
    new goog.events.Event(goog.ui.Component.EventType.SELECT, foo)
  )
  assertEquals("Foo must now be the selected tab", foo, tabBar.getSelectedTab())
}

function testHandleTabUnselect() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  bar.setSelected(true)
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())

  tabBar.handleTabUnselect(
    new goog.events.Event(goog.ui.Component.EventType.UNSELECT, foo)
  )
  assertEquals("Bar must remain the selected tab", bar, tabBar.getSelectedTab())

  tabBar.handleTabUnselect(
    new goog.events.Event(goog.ui.Component.EventType.SELECT, bar)
  )
  assertNull("No tab must be selected", tabBar.getSelectedTab())
}

function testHandleTabDisable() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  // Start with the middle tab selected.
  bar.setSelected(true)
  assertTrue("Bar must be selected", bar.isSelected())
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())

  // Should deselect bar and select the previous enabled, visible tab (foo).
  bar.setEnabled(false)
  assertFalse("Bar must no longer be selected", bar.isSelected())
  assertTrue("Foo must be selected", foo.isSelected())
  assertEquals("Foo must be the selected tab", foo, tabBar.getSelectedTab())

  // Should deselect foo and select the next enabled, visible tab (baz).
  foo.setEnabled(false)
  assertFalse("Foo must no longer be selected", foo.isSelected())
  assertTrue("Baz must be selected", baz.isSelected())
  assertEquals("Baz must be the selected tab", baz, tabBar.getSelectedTab())

  // Should deselect baz.  Since there are no enabled, visible tabs left,
  // the tab bar should have no selected tab.
  baz.setEnabled(false)
  assertFalse("Baz must no longer be selected", baz.isSelected())
  assertNull("No tab must be selected", tabBar.getSelectedTab())
}

function testHandleTabHide() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")))
  tabBar.addChild((bar = new goog.ui.Tab("bar")))
  tabBar.addChild((baz = new goog.ui.Tab("baz")))

  // Start with the middle tab selected.
  bar.setSelected(true)
  assertTrue("Bar must be selected", bar.isSelected())
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())

  // Should deselect bar and select the previous enabled, visible tab (foo).
  bar.setVisible(false)
  assertFalse("Bar must no longer be selected", bar.isSelected())
  assertTrue("Foo must be selected", foo.isSelected())
  assertEquals("Foo must be the selected tab", foo, tabBar.getSelectedTab())

  // Should deselect foo and select the next enabled, visible tab (baz).
  foo.setVisible(false)
  assertFalse("Foo must no longer be selected", foo.isSelected())
  assertTrue("Baz must be selected", baz.isSelected())
  assertEquals("Baz must be the selected tab", baz, tabBar.getSelectedTab())

  // Should deselect baz.  Since there are no enabled, visible tabs left,
  // the tab bar should have no selected tab.
  baz.setVisible(false)
  assertFalse("Baz must no longer be selected", baz.isSelected())
  assertNull("No tab must be selected", tabBar.getSelectedTab())
}

function testHandleFocus() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")), true)
  tabBar.addChild((bar = new goog.ui.Tab("bar")), true)
  tabBar.addChild((baz = new goog.ui.Tab("baz")), true)

  // Render the tab bar into the document, so highlight handling works as
  // expected.
  tabBar.render(sandbox)

  // Start with the middle tab selected.
  bar.setSelected(true)
  assertTrue("Bar must be selected", bar.isSelected())
  assertEquals("Bar must be the selected tab", bar, tabBar.getSelectedTab())

  assertNull("No tab must be highlighted", tabBar.getHighlighted())
  tabBar.handleFocus(
    new goog.events.Event(goog.events.EventType.FOCUS, tabBar.getElement())
  )
  assertTrue("Bar must be highlighted", bar.isHighlighted())
  assertEquals("Bar must be the highlighted tab", bar, tabBar.getHighlighted())
}

function testHandleFocusWithoutSelectedTab() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")), true)
  tabBar.addChild((bar = new goog.ui.Tab("bar")), true)
  tabBar.addChild((baz = new goog.ui.Tab("baz")), true)

  // Render the tab bar into the document, so highlight handling works as
  // expected.
  tabBar.render(sandbox)

  // Start with no tab selected.
  assertNull("No tab must be selected", tabBar.getSelectedTab())

  assertNull("No tab must be highlighted", tabBar.getHighlighted())
  tabBar.handleFocus(
    new goog.events.Event(goog.events.EventType.FOCUS, tabBar.getElement())
  )
  assertTrue("Foo must be highlighted", foo.isHighlighted())
  assertEquals("Foo must be the highlighted tab", foo, tabBar.getHighlighted())
}

function testGetOrientationFromLocation() {
  assertEquals(
    goog.ui.Container.Orientation.HORIZONTAL,
    goog.ui.TabBar.getOrientationFromLocation(goog.ui.TabBar.Location.TOP)
  )
  assertEquals(
    goog.ui.Container.Orientation.HORIZONTAL,
    goog.ui.TabBar.getOrientationFromLocation(goog.ui.TabBar.Location.BOTTOM)
  )
  assertEquals(
    goog.ui.Container.Orientation.VERTICAL,
    goog.ui.TabBar.getOrientationFromLocation(goog.ui.TabBar.Location.START)
  )
  assertEquals(
    goog.ui.Container.Orientation.VERTICAL,
    goog.ui.TabBar.getOrientationFromLocation(goog.ui.TabBar.Location.END)
  )
}

function testKeyboardNavigation() {
  var foo, bar, baz

  // Create a tab bar with some tabs.
  tabBar.addChild((foo = new goog.ui.Tab("foo")), true)
  tabBar.addChild((bar = new goog.ui.Tab("bar")), true)
  tabBar.addChild((baz = new goog.ui.Tab("baz")), true)
  tabBar.render(sandbox)

  // Highlight the selected tab (this happens automatically when the tab
  // bar receives keyboard focus).
  tabBar.setSelectedTabIndex(0)
  tabBar.getSelectedTab().setHighlighted(true)

  // Count events dispatched by each tab.
  var eventCount = {
    foo: { select: 0, unselect: 0 },
    bar: { select: 0, unselect: 0 },
    baz: { select: 0, unselect: 0 }
  }

  function countEvent(e) {
    var tabId = e.target.getContent()
    var type = e.type
    eventCount[tabId][type]++
  }

  function getEventCount(tabId, type) {
    return eventCount[tabId][type]
  }

  // Listen for SELECT and UNSELECT events on the tab bar.
  goog.events.listen(
    tabBar,
    [goog.ui.Component.EventType.SELECT, goog.ui.Component.EventType.UNSELECT],
    countEvent
  )

  // Verify baseline assumptions.
  assertTrue("Tab bar must auto-select tabs", tabBar.isAutoSelectTabs())
  assertEquals("First tab must be selected", 0, tabBar.getSelectedTabIndex())

  // Simulate a right arrow key event.
  var rightEvent = new FakeKeyEvent(goog.events.KeyCodes.RIGHT)
  assertTrue(
    "Key event must have beeen handled",
    tabBar.handleKeyEvent(rightEvent)
  )
  assertTrue(
    "Key event propagation must have been stopped",
    rightEvent.propagationStopped
  )
  assertTrue(
    "Default key event must have been prevented",
    rightEvent.defaultPrevented
  )
  assertEquals(
    "Foo must have dispatched UNSELECT",
    1,
    getEventCount("foo", goog.ui.Component.EventType.UNSELECT)
  )
  assertEquals(
    "Bar must have dispatched SELECT",
    1,
    getEventCount("bar", goog.ui.Component.EventType.SELECT)
  )
  assertEquals("Bar must have been selected", bar, tabBar.getSelectedTab())

  // Simulate a left arrow key event.
  var leftEvent = new FakeKeyEvent(goog.events.KeyCodes.LEFT)
  assertTrue(
    "Key event must have beeen handled",
    tabBar.handleKeyEvent(leftEvent)
  )
  assertTrue(
    "Key event propagation must have been stopped",
    leftEvent.propagationStopped
  )
  assertTrue(
    "Default key event must have been prevented",
    leftEvent.defaultPrevented
  )
  assertEquals(
    "Bar must have dispatched UNSELECT",
    1,
    getEventCount("bar", goog.ui.Component.EventType.UNSELECT)
  )
  assertEquals(
    "Foo must have dispatched SELECT",
    1,
    getEventCount("foo", goog.ui.Component.EventType.SELECT)
  )
  assertEquals("Foo must have been selected", foo, tabBar.getSelectedTab())

  // Disable tab auto-selection.
  tabBar.setAutoSelectTabs(false)

  // Simulate another left arrow key event.
  var anotherLeftEvent = new FakeKeyEvent(goog.events.KeyCodes.LEFT)
  assertTrue(
    "Key event must have beeen handled",
    tabBar.handleKeyEvent(anotherLeftEvent)
  )
  assertTrue(
    "Key event propagation must have been stopped",
    anotherLeftEvent.propagationStopped
  )
  assertTrue(
    "Default key event must have been prevented",
    anotherLeftEvent.defaultPrevented
  )
  assertEquals("Foo must remain selected", foo, tabBar.getSelectedTab())
  assertEquals(
    "Foo must not have dispatched another UNSELECT event",
    1,
    getEventCount("foo", goog.ui.Component.EventType.UNSELECT)
  )
  assertEquals(
    "Baz must not have dispatched a SELECT event",
    0,
    getEventCount("baz", goog.ui.Component.EventType.SELECT)
  )
  assertFalse("Baz must not be selected", baz.isSelected())
  assertTrue("Baz must be highlighted", baz.isHighlighted())

  // Simulate 'g' key event.
  var gEvent = new FakeKeyEvent(goog.events.KeyCodes.G)
  assertFalse(
    "Key event must not have beeen handled",
    tabBar.handleKeyEvent(gEvent)
  )
  assertFalse(
    "Key event propagation must not have been stopped",
    gEvent.propagationStopped
  )
  assertFalse(
    "Default key event must not have been prevented",
    gEvent.defaultPrevented
  )
  assertEquals("Foo must remain selected", foo, tabBar.getSelectedTab())

  // Clean up.
  goog.events.unlisten(
    tabBar,
    [goog.ui.Component.EventType.SELECT, goog.ui.Component.EventType.UNSELECT],
    countEvent
  )
}

function testExitAndEnterDocument() {
  var component = new goog.ui.Component()
  component.render(sandbox)

  var tab1 = new goog.ui.Tab("tab1")
  var tab2 = new goog.ui.Tab("tab2")
  var tab3 = new goog.ui.Tab("tab3")
  tabBar.addChild(tab1, true)
  tabBar.addChild(tab2, true)
  tabBar.addChild(tab3, true)

  component.addChild(tabBar, true)
  tab2.setSelected(true)
  assertEquals(tabBar.getSelectedTab(), tab2)

  component.removeChild(tabBar, true)
  tab1.setSelected(true)
  assertEquals(tabBar.getSelectedTab(), tab2)

  component.addChild(tabBar, true)
  tab3.setSelected(true)
  assertEquals(tabBar.getSelectedTab(), tab3)
}
