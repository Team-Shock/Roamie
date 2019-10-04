const Sequelize = require('sequelize')
const db = require('../db')

const TripPlaces = db.define('tripplaces', {
    rating : {
        type : Sequelize.STRING,
        defaultValue: 'thumbs-up',
        validate : {
            isIn: [['thumbs-up', 'thumbs-down']]
        }
    },
    notes: {
        type: Sequelize.TEXT
    },
    date: {
        type: Sequelize.DATE
    },
    //to be expanded
    photos: {
        type: Sequelize.STRING
    }
})

module.exports = TripPlaces
