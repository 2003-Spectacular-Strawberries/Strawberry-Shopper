const router = require('express').Router()
const {Order, OrderItems, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get all products for a specific order, get the quantities of each product
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.userId, isCart: true},
      include: {model: Product}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/history', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userId, isCart: false},
      include: {model: Product}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
