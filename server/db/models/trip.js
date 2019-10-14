const Sequelize = require('sequelize');
const db = require('../db');

const Trip = db.define('trip', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://i.pinimg.com/originals/25/37/1c/25371c9b92aabb4ba74ea434a30b78fa.jpg',
  },
  startDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  endDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  startLat: {
    type: Sequelize.FLOAT,
  },
  startLong: {
    type: Sequelize.FLOAT,
  },
  endLat: {
    type: Sequelize.FLOAT,
  },
  endLong: {
    type: Sequelize.FLOAT,
  },
  sharingUrl: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'in progress',
    validate: {
      isIn: [['in progress', 'complete']],
    },
  },
});

module.exports = Trip;
