(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function fib() {
    return [0,1,1,2,3,5,8,13,21];
  };

  exports.fib = fib;

  Object.defineProperty(exports, '__esModule', { value: true });

}));