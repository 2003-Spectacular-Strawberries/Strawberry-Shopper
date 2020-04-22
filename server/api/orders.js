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

/* this route queries the Order table with a userId to get the 
orderId for their active order (where isCart: true), 
then queries the OrderItems table to update the specified product
for the relevant order to have the quantity send by the front-end thunk
*/
router.put('/user/:userId/product/:productId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.userId, isCart: true},
      include: {model: Product}
    })
    const orderItem = await OrderItems.findOrCreate({
      where: {
        orderId: order.Id,
        productId: req.params.productId
      },
      quantity: req.body.quantity
    })
    res.status(200).json(orderItem)
  } catch (err) {
    next(err)
  }
})
