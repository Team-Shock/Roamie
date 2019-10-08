'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authProviders = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _valib = require('valib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var notEmpty = function notEmpty(str) {
  return _valib.Type.isString(str) && !_valib.String.isEmpty(str) || 'cannot be empty';
};

var isValid = function isValid(prop, str) {
  var validations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return validations.map(function (fn) {
    var val = fn(str);
    (0, _invariant2.default)(typeof val === 'boolean', prop + ' ' + val);
  });
};
var withDefaultValidations = function withDefaultValidations(validations) {
  return Object.assign({}, {
    callback_url: [notEmpty]
  }, validations);
};

var validate = function validate() {
  var customValidations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (props) {
    var validations = withDefaultValidations(customValidations);
    return Object.keys(props).map(function (property) {
      return isValid(property, props[property], validations[property]);
    });
  };
};

var authProviders = exports.authProviders = {
  'twitter': {
    auth_version: "1.0",
    request_token_url: 'https://api.twitter.com/oauth/request_token',
    authorize_url: 'https://api.twitter.com/oauth/authorize',
    access_token_url: 'https://api.twitter.com/oauth/access_token',
    api_url: 'https://api.twitter.com',
    callback_url: function callback_url(_ref) {
      var app_name = _ref.app_name;
      return app_name + '://oauth-response/twitter';
    },

    validate: validate({
      consumer_key: [notEmpty],
      consumer_secret: [notEmpty]
    })
  },
  'facebook': {
    auth_version: "2.0",
    authorize_url: 'https://graph.facebook.com/oauth/authorize',
    api_url: 'https://graph.facebook.com',
    callback_url: function callback_url(_ref2) {
      var client_id = _ref2.client_id;
      return 'fb' + client_id + '://authorize';
    },

    validate: validate({
      client_id: [notEmpty],
      client_secret: [notEmpty]
    })
  },
  'google': {
    auth_version: "2.0",
    authorize_url: 'https://accounts.google.com/o/oauth2/auth',
    access_token_url: 'https://accounts.google.com/o/oauth2/token',
    callback_url: function callback_url(_ref3) {
      var app_name = _ref3.app_name;
      return app_name + '://oauth-response';
    },
    validate: validate()
  },
  'github': {
    auth_version: '2.0',
    authorize_url: 'https://github.com/login/oauth/authorize',
    access_token_url: 'https://github.com/login/oauth/access_token',
    api_url: 'https://api.github.com',
    callback_url: function callback_url(_ref4) {
      var app_name = _ref4.app_name;
      return app_name + '://oauth';
    },
    validate: validate()
  },
  'slack': {
    auth_version: '2.0',
    authorize_url: 'https://slack.com/oauth/authorize',
    access_token_url: 'https://slack.com/api/oauth.access',
    api_url: 'https://slack.com/api',
    callback_url: function callback_url(_ref5) {
      var app_name = _ref5.app_name;
      return app_name + '://oauth';
    },
    defaultParams: {
      token: 'access_token'
    },
    validate: validate({
      client_id: [notEmpty],
      client_secret: [notEmpty]
    })
  },
  'spotify': {
    auth_version: "2.0",
    authorize_url: 'https://accounts.spotify.com/authorize',
    api_url: 'https://api.spotify.com/',
    callback_url: function callback_url(_ref6) {
      var app_name = _ref6.app_name;
      return app_name + '://authorize';
    },

    validate: validate({
      client_id: [notEmpty],
      client_secret: [notEmpty]
    })
  }
};

exports.default = authProviders;
//# sourceMappingURL=authProviders.js.map
//# sourceMappingURL=authProviders.js.map
//# sourceMappingURL=authProviders.js.map