const Sequelize = require("sequelize");
const db = require("../db");

const UserPreferences = db.define("userpreferences", {
  selected: Sequelize.BOOLEAN
});

module.exports = UserPreferences;
