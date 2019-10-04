const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://staceylarsen.typepad.com/.a/6a015390d3bc08970b016768711edf970b-pi'
  },
  description: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue:new Date()
  },
  locationAddress: {
    type: Sequelize.STRING
  },
  locationLat: {
    type: Sequelize.STRING
  },
  locationLong: {
    type: Sequelize.STRING
  },
  visibility: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Place
