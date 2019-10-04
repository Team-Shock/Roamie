const Sequelize = require('sequelize')
const db = require('../db')

const Preferences = db.define('preferences', {
  name: {
    type: Sequelize.STRING,
  }
})

module.exports = Preferences
