const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const Preferences = require('../models/preferences');
const UserPreferences = require('../models/userpreferences');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
  facebookId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

//instanceMethods
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

//classMethods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

// hook functions

//hash password on change or set
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

//set initial preferences on new user instance
const setDefaultPreferences = async user => {
  const preferences = await Preferences.findAll();
  await Promise.all(
    preferences.map(async pref => {
      await UserPreferences.create({ userId: user.id, preferenceId: pref.id });
    })
  );
};

//hooks
User.beforeCreate(setSaltAndPassword);
User.afterSave(setDefaultPreferences);
User.beforeUpdate(setSaltAndPassword);
User.afterBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
User.beforeBulkCreate(users => {
  users.forEach(setDefaultPreferences);
});
