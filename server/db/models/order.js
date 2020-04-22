const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipping: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE
    // allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  orderNumber: {
    type: Sequelize.INTEGER
    // allowNull: false
  }
})

module.exports = Order
