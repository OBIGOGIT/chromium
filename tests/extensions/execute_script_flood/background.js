// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.browserAction.setBadgeText({text: "ON"});
console.log("Loaded.");

var MAX_ITER = 1000;
var currentIter = 0;
var recursiveTry = function() {
  ++currentIter;
  if (currentIter > MAX_ITER) return;
  chrome.tabs.executeScript(undefined, {file: "content.js"}, recursiveTry);
};

chrome.browserAction.onClicked.addListener(function() {
  console.log('Start');
  // File version
  /*
  for (var i = 0; i < MAX_ITER; ++i) {
    chrome.tabs.executeScript(undefined, {file: "content.js"}, function() {});
  }
  */
  // This repros.
  currentIter = 0;
  recursiveTry();
  /*
  for (var i = 0; i < MAX_ITER; ++i) {
    var str = 'foo ' + i;
    chrome.tabs.executeScript(undefined, {code: "dummy = '" + str + "';" }, function() {});
  }
  */
  console.log('Finish');
});
