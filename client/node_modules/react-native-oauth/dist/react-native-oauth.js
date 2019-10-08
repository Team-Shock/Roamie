'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @providesModule OAuthManager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @flow
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _reactNative = require('react-native');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _promisify = require('./lib/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

var _authProviders = require('./lib/authProviders');

var _authProviders2 = _interopRequireDefault(_authProviders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OAuthManagerBridge = _reactNative.NativeModules.OAuthManager;

var configured = false;
var STORAGE_KEY = 'ReactNativeOAuth';


var authProviders = _authProviders2.default;

var identity = function identity(props) {
  return props;
};
/**
 * Manager is the OAuth layer
 **/

var OAuthManager = function () {
  function OAuthManager(appName) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, OAuthManager);

    (0, _invariant2.default)(appName && appName != '', 'You must provide an appName to the OAuthManager');

    this.appName = appName;
    this._options = opts;
  }

  _createClass(OAuthManager, [{
    key: 'addProvider',
    value: function addProvider(provider) {
      authProviders = Object.assign({}, authProviders, provider);
    }
  }, {
    key: 'configure',
    value: function configure(providerConfigs) {
      return this.configureProviders(providerConfigs);
    }
  }, {
    key: 'authorize',
    value: function authorize(provider) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var options = Object.assign({}, this._options, opts, {
        app_name: this.appName
      });
      return (0, _promisify2.default)('authorize')(provider, options);
    }
  }, {
    key: 'savedAccounts',
    value: function savedAccounts() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // const options = Object.assign({}, this._options, opts, {
      // app_name: this.appName
      // })
      // return promisify('getSavedAccounts')(options);
      var promises = this.providers().map(function (name) {
        return _this.savedAccount(name).catch(function (err) {
          return { provider: name, status: "error" };
        });
      });
      return Promise.all(promises).then(function (accountResp) {
        var accounts = accountResp.filter(function (acc) {
          return acc.status == "ok";
        });
        return { accounts: accounts };
      });
    }
  }, {
    key: 'savedAccount',
    value: function savedAccount(provider) {
      var options = Object.assign({}, this._options, {
        app_name: this.appName
      });
      return (0, _promisify2.default)('getSavedAccount')(provider, options);
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest(provider, url) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var options = Object.assign({}, this._options, opts, {
        app_name: this.appName
      });

      console.log('making request', provider, url, opts);

      return (0, _promisify2.default)('makeRequest')(provider, url, options).then(function (response) {
        // Little bit of a hack to support Android until we have a better
        // way of decoding the JSON response on the Android side
        if (response && response.data && typeof response.data === "string") {
          response.data = JSON.parse(response.data);
        }
        return response;
      });
    }
  }, {
    key: 'deauthorize',
    value: function deauthorize(provider) {
      return (0, _promisify2.default)('deauthorize')(provider);
    }
  }, {
    key: 'providers',
    value: function providers() {
      return OAuthManager.providers();
    }
  }, {
    key: 'configureProvider',


    // Private
    /**
     * Configure a single provider
     *
     *
     * @param {string} name of the provider
     * @param {object} additional configuration
     *
     **/
    value: function configureProvider(name, props) {
      (0, _invariant2.default)(OAuthManager.isSupported(name), 'The provider ' + name + ' is not supported yet');

      var providerCfg = Object.assign({}, authProviders[name]);
      var _providerCfg$validate = providerCfg.validate,
          validate = _providerCfg$validate === undefined ? identity : _providerCfg$validate,
          _providerCfg$transfor = providerCfg.transform,
          transform = _providerCfg$transfor === undefined ? identity : _providerCfg$transfor,
          callback_url = providerCfg.callback_url;

      delete providerCfg.transform;
      delete providerCfg.validate;

      var config = Object.assign({}, {
        app_name: this.appName,
        callback_url: callback_url
      }, providerCfg, props);

      if (config.defaultParams) {
        delete config.defaultParams;
      }

      config = Object.keys(config).reduce(function (sum, key) {
        return _extends({}, sum, _defineProperty({}, key, typeof config[key] === 'function' ? config[key](config) : config[key]));
      }, {});

      validate(config);

      return (0, _promisify2.default)('configureProvider')(name, config);
    }
  }, {
    key: 'configureProviders',
    value: function configureProviders(providerConfigs) {
      var _this2 = this;

      providerConfigs = providerConfigs || this._options;
      var promises = Object.keys(providerConfigs).map(function (name) {
        return _this2.configureProvider(name, providerConfigs[name]);
      });
      return Promise.all(promises).then(function () {
        return _this2;
      });
    }
  }], [{
    key: 'providers',
    value: function providers() {
      return Object.keys(authProviders);
    }
  }, {
    key: 'isSupported',
    value: function isSupported(name) {
      return OAuthManager.providers().indexOf(name) >= 0;
    }
  }]);

  return OAuthManager;
}();

exports.default = OAuthManager;
//# sourceMappingURL=react-native-oauth.js.map