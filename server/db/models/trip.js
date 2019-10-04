const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
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
      'https://tfkru2exl1c11xfih48h8lmg6y-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/image-coming-soon.jpg'
  },
//   date: {
//     type: Sequelize.DATE
//   },
  sharingUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Trip
