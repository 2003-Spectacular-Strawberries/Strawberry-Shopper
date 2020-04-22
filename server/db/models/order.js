const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  shipping: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billing: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
})

module.exports = Order
