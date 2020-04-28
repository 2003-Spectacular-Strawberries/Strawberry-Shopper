const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: true
  }
})

module.exports = OrderItems
