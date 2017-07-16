'use strict';

// A lightweight replacement for invariant/node assert
function assert(condition) {
  if (!condition) {
    throw new Error('assertion failure');
  }
}

module.exports = assert;