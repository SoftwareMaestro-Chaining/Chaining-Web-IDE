// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

goog.provide("goog.ui.IdleTimerTest")
goog.setTestOnly("goog.ui.IdleTimerTest")

goog.require("goog.events")
goog.require("goog.testing.MockClock")
goog.require("goog.testing.jsunit")
goog.require("goog.ui.IdleTimer")
goog.require("goog.ui.MockActivityMonitor")

var clock

function setUp() {
  clock = new goog.testing.MockClock(true)
  goog.now = goog.bind(clock.getCurrentTime, clock)
}

function tearDown() {
  clock.dispose()
}

/**
 * Tests whether an event is fired when the user becomes idle
 */
function testBecomeIdle() {
  var idleThreshold = 1000
  var mockActivityMonitor = new goog.ui.MockActivityMonitor()
  var idleTimer = new goog.ui.IdleTimer(idleThreshold, mockActivityMonitor)

  mockActivityMonitor.simulateEvent()
  assertFalse("Precondition: user should be active", idleTimer.isIdle())

  var onBecomeIdleCount = 0
  var onBecomeIdle = function() {
    onBecomeIdleCount += 1
  }
  goog.events.listen(
    idleTimer,
    goog.ui.IdleTimer.Event.BECOME_IDLE,
    onBecomeIdle
  )

  clock.tick(idleThreshold)
  mockActivityMonitor.simulateEvent()
  clock.tick(idleThreshold)
  assert("The BECOME_IDLE event fired too early", onBecomeIdleCount == 0)
  assertFalse("The user should still be active", idleTimer.isIdle())

  clock.tick(1)
  assert("The BECOME_IDLE event fired too late", onBecomeIdleCount == 1)
  assert("The user should be idle", idleTimer.isIdle())

  idleTimer.dispose()
}

/**
 * Tests whether an event is fired when the user becomes active
 */
function testBecomeActive() {
  var idleThreshold = 1000
  var mockActivityMonitor = new goog.ui.MockActivityMonitor()
  var idleTimer = new goog.ui.IdleTimer(idleThreshold, mockActivityMonitor)

  clock.tick(idleThreshold + 1)
  assert("Precondition: user should be idle", idleTimer.isIdle())

  var onBecomeActiveCount = 0
  var onBecomeActive = function() {
    onBecomeActiveCount += 1
  }
  goog.events.listen(
    idleTimer,
    goog.ui.IdleTimer.Event.BECOME_ACTIVE,
    onBecomeActive
  )

  clock.tick(idleThreshold)
  assert("The BECOME_ACTIVE event fired too early", onBecomeActiveCount == 0)
  assert("The user should still be idle", idleTimer.isIdle())

  mockActivityMonitor.simulateEvent()
  assert("The BECOME_ACTIVE event fired too late", onBecomeActiveCount == 1)
  assertFalse("The user should be active", idleTimer.isIdle())

  idleTimer.dispose()
}
