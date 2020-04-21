const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  items: {
    type: Sequelize.HSTORE,
    allowNull: true
  }
})

module.exports = Cart