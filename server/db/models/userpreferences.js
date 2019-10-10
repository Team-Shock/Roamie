const Sequelize = require('sequelize');
const db = require('../db');

const UserPreferences = db.define('userpreferences', {
  selected: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

UserPreferences.prototype.toggleSelected = async function() {
  const boolean = this.selected;
  this.selected = !boolean;
};

module.exports = UserPreferences;
