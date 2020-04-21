const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
        isNumeric: true,
        min: 0.01
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        isNumeric: true,
        min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    default: 'https://i.imgur.com/POLRlNo.jpg',
    validate: {
        isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Product