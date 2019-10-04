const Sequelize = require('sequelize')
const db = require('../db')

const Preferences = db.define('preferences', {
  tags: {
    type: Sequelize.STRING,
  }
})

module.exports = Preferences
