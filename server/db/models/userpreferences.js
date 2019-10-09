const Sequelize = require('sequelize');
const db = require('../db');

const UserPreferences = db.define('userpreferences', {
  selected: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = UserPreferences;
