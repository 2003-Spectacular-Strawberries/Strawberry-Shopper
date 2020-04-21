const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        max: 5,
        min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
        isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Review