'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = undefined;

var _reactNative = require('react-native');

var OAuthManagerBridge = _reactNative.NativeModules.OAuthManager;

var promisify = exports.promisify = function promisify(fn, NativeModule) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var Module = NativeModule ? NativeModule : OAuthManagerBridge;
    return new Promise(function (resolve, reject) {
      var _ref;

      var handler = function handler(err, resp) {
        err ? reject(err) : resolve(resp);
      };
      args.push(handler);
      (_ref = typeof fn === 'function' ? fn : Module[fn]).call.apply(_ref, [Module].concat(args));
    });
  };
};

exports.default = promisify;
//# sourceMappingURL=promisify.js.map
//# sourceMappingURL=promisify.js.map
//# sourceMappingURL=promisify.js.map
//# sourceMappingURL=promisify.js.map
//# sourceMappingURL=promisify.js.map