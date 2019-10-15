const Sequelize = require('sequelize')
const db = require('../db')

const TripPlaces = db.define('tripplaces', {
    rating: {
        type: Sequelize.STRING,
        defaultValue: 'not rated',
        validate: {
            isIn: [['thumbs up', 'thumbs down', 'not rated']]
        }
    },
    notes: {
        type: Sequelize.TEXT
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    //to be expanded
    photos: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
})

module.exports = TripPlaces
