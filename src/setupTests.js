import '@testing-library/jest-dom';

// Add TextEncoder polyfill
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
} 