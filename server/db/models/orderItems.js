const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      isInt: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: true
  }
})

module.exports = OrderItems
