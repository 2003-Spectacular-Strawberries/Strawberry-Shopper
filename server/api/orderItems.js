const router = require('express').Router()
const {OrderItems} = require('../db/models')
module.exports = router

//this id will have to be the order id, which will have been pulled from the order table
//using someone's user id
router.get('/:orderId/product/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItems.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

//make sure to send total desired quantity from front-ended
//or see if can code a += functionality into this route
router.put('/:orderId/product/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItems.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      },
      quantity: req.body.quantity
    })
    res.status(200).json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/products/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItems.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    await orderItem.destroy()
    res.status(200).send('Item removed from order.')
  } catch (err) {
    next(err)
  }
})
