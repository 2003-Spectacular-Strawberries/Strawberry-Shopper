const router = require('express').Router()
const {Order, OrderItems, Product} = require('../db/models')
const isAdminMiddleware = require('../auth/isAdmin')
const isUserMiddleware = require('../auth/isUser')
const onlyUserMiddleware = require('../auth/onlyUser')
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
router.put('/guest', async (req, res, next) => {
  try {
    const order = await Order.create({
      where: {
        email: req.body.email,
        shipping: req.body.shipping,
        billing: req.body.billing,
        price: req.body.price,
        isCart: false
      }
    })

    req.body.products.forEach(async function(product) {
      await OrderItems.create({
        where: {
          orderId: order.id,
          productId: product.id,
          price: product.price,
          quantity: product.quantity
        }
      })
    })

    res.json(order)
  } catch (err) {
    next(err)
  }
})

//get all products for a specific order, get the quantities of each product
router.get('/:userId/cart', isUserMiddleware, async (req, res, next) => {
  try {
    console.log('API ROUTE RUNNING', req.params.userId)
    const order = await Order.findOne({
      where: {userId: req.params.userId, isCart: true},
      include: {model: Product}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart/save', onlyUserMiddleware, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    })

    order.update({isCart: false})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/history', isUserMiddleware, async (req, res, next) => {
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
for the relevant order to have the quantity sent by the front-end thunk
*/
router.put(
  '/user/:userId/product/:productId',
  onlyUserMiddleware,
  async (req, res, next) => {
    try {
      const order = await Order.findOrCreate({
        where: {userId: req.params.userId, isCart: true},
        include: {model: Product}
      })

      const orderItem = await OrderItems.findOrCreate({
        where: {
          orderId: order[0].dataValues.id,
          productId: req.params.productId
        }
      })

      // Must ensure quantity sums with preexisting quantity on the orderItem model or frontend
      await orderItem[0].update({
        quantity: req.body.quantity
      })

      res.status(200).json(orderItem)
    } catch (err) {
      next(err)
    }
  }
)
